import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBars } from "@fortawesome/pro-solid-svg-icons";
import { SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import { bucketM } from "../services/urls";
import { logo } from "../assets/svg";
import { ButtonBasic } from "./buttons";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import Company from "../services/models/company";
import { LoadingBar } from "./loading-bar";

interface NavbarProps {
  transparent?: boolean;
  url: string;
  company: Company
}

interface LinkProps {
  url: string;
  title?: string;
}

const setSections = (company: Company): LinkProps[] => {
  let linkList: LinkProps[] = [];
  (company.careers?.departments?.visible) && linkList.push({url: 'teams', title: company.careers?.departments?.navbar });
  (company.careers?.referrers?.visible) && linkList.push({url: 'people', title: company.careers?.referrers?.navbar });
  (company.careers?.workplaces?.visible) && linkList.push({url: 'locations', title: company.careers?.workplaces?.navbar });
  (company.benefits.length > 0) && linkList.push({url: 'benefits' });
  linkList.push({url: 'jobs', title: company.careers?.jobs?.navbar });
  (company.careers?.stories?.visible) && linkList.push({url: 'stories', title: company.careers?.stories?.navbar });
  return linkList;
}

export const Navbar = ({ transparent = false, url, company }: NavbarProps) => {
  const { t } = useTranslation("common");
  const [state, setState] = useState({ navbar: false });
  const [clientWindowHeight, setClientWindowHeight] = useState("");
  let linkList: LinkProps[] = setSections(company);
  const [scrolled, setScrolling] = useState(false);
  const handleScroll = () => {
    setClientWindowHeight((window.scrollY).toString());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setScrolling(+clientWindowHeight > 0);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [clientWindowHeight]);

  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const LinksList = () => (
    <div className="flex items-center justify-between flex-1">
      <div className={`flex items-center`} >
        {
          linkList.map((link, i) => (
            <div key={i} className={`navbar-item relative px-2 h-5 flex flex-align-center ${(url === link.url) && 'active'}`}>
              <Link href={`/${link.url}`}>
                <span className={` ${((scrolled && transparent) || (!transparent) ? "font--grey-1000" : "font--light")}`}>{link.title || t(link.url)}</span>
              </Link>
              <div className="navbar-item-underline absolute h-0.5 left-2 right-2 bottom-0" style={{ backgroundColor: company.attributes.primaryColor }}></div>
            </div>
          ))
        }
      </div>

      <div className="flex mx-2">
        <CompanyWebsiteButton />
      </div>
    </div>
  );

  const CompanyWebsiteButton = () => {
    const { t } = useTranslation("common");

    return (
      <Link href={company.attributes?.site} target="_blank">
          <ButtonBasic>
            {t('company-site')}
            <div className='w-2 h-2 flex items-center justify-center ml-1'>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="icon-font icon-font--normal" />
            </div>
          </ButtonBasic>
      </Link>
    )
  }

  const NavbarItem = ({ link }: { link: LinkProps }) => (
    <div className={`navbar-item relative px-3 h-5 flex flex-align-center ${(url === link.url) ? 'active' : ''}`}>
      <Link href={`/${link.url}`}>{link.title || t(link.url)}</Link>
      <div className="navbar-item-underline absolute left-2 right-2 bottom-0" style={{ backgroundColor: company.attributes.primaryColor }}></div>
    </div>
  )

  const SideBarLinks = () => (
    <div className="w-72 h-full flex flex-col items-center justify-between py-2 background-color--white">
      <div className="flex w-full flex-col space-y-3">
        <div className="flex justify-between items-center px-3">
          <div className='w-2 h-2 flex items-center justify-center'>
            <FontAwesomeIcon icon={faXmark} className="cursor-pointer icon-font icon-font--navbar" onClick={toggleDrawer("navbar", false)}></FontAwesomeIcon>
          </div>
          <CompanyWebsiteButton />
        </div>
        {
          linkList.map((link, i) =>
            <div key={i} className="flex py-1">
              <NavbarItem link={link} />
            </div>
          )
        }
      </div>
    </div>
  );

  const srcLogo = company.attributes?.logo ? bucketM + company.attributes?.logo : logo;
  return (
    <nav className={`sticky top-0 left-0 right-0 w-full z-20 transition-all box-shadow-container
    ${((scrolled && transparent) || (!transparent) ? "background-color--white" : "background-color--blurr-soft-dark")}
    ${transparent && "navbar--stuck"}
    `}>
      {
        !state.navbar &&
        <LoadingBar color={company.attributes.primaryColor} />
      }
      <div className="flex mobile-container--responsive h-10 items-center justify-between">
        <div className="hidden cursor-pointer mobile:flex justify-center items-center w-10 h-10" onClick={toggleDrawer("navbar", true)}>
          <div className="w-2 h-2">
            <FontAwesomeIcon
              icon={faBars}
              className={`icon-font icon-font--navbar ${((scrolled && transparent) || (!transparent) ? "icon-font--grey-1000" : "icon-font--white")}`}
            ></FontAwesomeIcon>
          </div>
        </div>

        <Link href="/">
          <span className="w-10 h-10 flex flex-align-justify-center"><div className="w-5 h-5 rounded-md background-center" style={{ backgroundImage: srcLogo ? `url(${srcLogo})` : '' }}></div></span>
        </Link>

        <div className="w-10 desktop:hidden"></div>

        <div className="flex w-full mobile:hidden">
          <LinksList></LinksList>
        </div>

        <SwipeableDrawer
          anchor={"left"}
          open={state["navbar"]}
          onClose={toggleDrawer("navbar", false)}
          onOpen={toggleDrawer("navbar", true)}
        >
          <LoadingBar color={company.attributes.primaryColor} />
          <SideBarLinks></SideBarLinks>
        </SwipeableDrawer>
      </div>
    </nav>
  );
};