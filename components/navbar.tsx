import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { SwipeableDrawer } from "@mui/material";
import React from "react";
import { bucketM } from "../services/urls";
import { logo } from "../assets/svg";
import { ButtonBasic } from "./buttons/button-basic";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";

interface NavbarProps {
  logoUrl: string;
  transparent?: boolean;
  url: string;
  companyUrl: string;
}

export const Navbar = ({ logoUrl, transparent = false, url, companyUrl }: NavbarProps) => {
  const { t } = useTranslation("common");
  const [state, setState] = React.useState({ navbar: false });
  const [clientWindowHeight, setClientWindowHeight] = React.useState("");
  const linkList = ['teams', 'locations', 'stories', 'jobs'];
  const [scrolled, setScrolling] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight((window.scrollY).toString());
  };

  React.useEffect(() => {
    setScrolling(+clientWindowHeight > 0);
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
      <div className={`flex items-center space-x-14`} >
        {
          linkList.map((link, i) => (
            <Link key={i} href={`/${link}`}>
              <a className={`
              navbar-item 
              ${((scrolled && transparent) || (!transparent) ? "font--black" : "font--white")} 
              ${(url === link) && 'active font-bold'}`}
              >{transparent}{t(link)}</a>
            </Link>
          ))
        }
      </div>

      <div className="flex items-center space-x-8">
        <Link href={companyUrl}>
          <a target="_blank">
            <ButtonBasic>{t("company-site")}</ButtonBasic>
          </a>
        </Link>
      </div>
    </div>
  );

  const SideBarLinks = () => (
    <div className="w-64 h-full flex flex-col items-center justify-between py-2 px-3">
      <div className="flex w-full flex-col space-y-10">
        <div className="flex justify-between items-center">
          <FontAwesomeIcon icon={faXmark} className="cursor-pointer icon-font--candidate-navbar" onClick={toggleDrawer("navbar", false)}></FontAwesomeIcon>
          <Link href="/">
            <a target="_blank">
              <ButtonBasic>{t("company-site")}</ButtonBasic>
            </a>
          </Link>
        </div>
        {
          linkList.map((link, i) =>
            <Link key={i} href={`/${link}`}>
              <a className={`navbar-item ${url?.includes(link) && 'font-bold'}`} onClick={toggleDrawer("navbar", false)}>{t(link)}</a>
            </Link>
          )
        }
      </div>
    </div>
  );

  const srcLogo = logoUrl ? bucketM + logoUrl : logo;
  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-20  transition-all 
    ${((scrolled && transparent) || (!transparent) ? "bg-white" : "bg-transparent")}
    ${scrolled ? 'box-shadow-container' : ''}
    `}>
      <div className="mobile-container mx-auto flex h-8 items-center justify-between">
        <div className="hidden cursor-pointer mobile:flex justify-center items-center w-8 h-8" onClick={toggleDrawer("navbar", true)}>
          <FontAwesomeIcon
            icon={faBars} style={{ fontSize: "1.3rem" }}
            className={`${((scrolled && transparent) || (!transparent) ? "" : "icon-font--light")}`}
          ></FontAwesomeIcon>
        </div>

        <Link href="/">
          <a> <div className="w-5 h-5 rounded-md bg-contain desktop:mr-14" style={{ backgroundImage: srcLogo ? `url(${srcLogo})` : '' }}></div></a>
        </Link>

        <div className="w-8"></div>

        <div className="flex w-full mobile:hidden">
          <LinksList></LinksList>
        </div>

        <SwipeableDrawer
          anchor={"left"}
          open={state["navbar"]}
          onClose={toggleDrawer("navbar", false)}
          onOpen={toggleDrawer("navbar", true)}
        >
          <SideBarLinks></SideBarLinks>
        </SwipeableDrawer>
      </div>
    </nav>
  );
};