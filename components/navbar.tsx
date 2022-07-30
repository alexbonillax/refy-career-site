import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { SwipeableDrawer } from "@material-ui/core";
import React from "react";
import { bucketM } from "../services/urls";
import { logo } from "../assets/svg";

const Navbar = ({logoUrl}: {logoUrl: string}) => {
  const { t } = useTranslation("common");
  const [state, setState] = React.useState({ navbar: false });
  const [clientWindowHeight, setClientWindowHeight] = React.useState("");

  const [boxShadow, setBoxShadow] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight((window.scrollY).toString());
  };

  React.useEffect(() => {
    setBoxShadow(+clientWindowHeight > 0);
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
      <div className="flex items-center space-x-14">
        <Link href="/teams">
          <a className="font-navbar">{t("navbar.teams")}</a>
        </Link>
        <Link href="/locations">
          <a className="font-navbar">{t("navbar.locations")}</a>
        </Link>
        <Link href="/stories">
          <a className="font-navbar">{t("navbar.stories")}</a>
        </Link>
        <Link href="/jobs">
          <a className="font-navbar">{t("navbar.jobs")}</a>
        </Link>
      </div>

      <div className="flex items-center space-x-8">
        <Link href="/">
          <a className="font-navbar" target="_blank">{t("navbar.company-site")}</a>
        </Link>
      </div>
    </div>
  );

  const SideBarLinks = () => (
    <div className="w-80 h-full flex flex-col items-center justify-between py-10">
      <div className="flex w-full flex-col items-center space-y-5">
        <Link href="/">
          <a className="font-navbar" onClick={toggleDrawer("navbar", false)}>{t("navbar.home")}</a>
        </Link>
        <div className="h-px w-full bg-gray-100"></div>
        <Link href="/teams">
          <a className="font-navbar" onClick={toggleDrawer("navbar", false)}>{t("navbar.teams")}</a>
        </Link>
        <div className="h-px w-full bg-gray-100"></div>
        <Link href="/locations">
          <a className="font-navbar" onClick={toggleDrawer("navbar", false)}>{t("navbar.locations")}</a>
        </Link>
        <div className="h-px w-full bg-gray-100"></div>
        <Link href="stories">
          <a className="font-navbar" target="_blank" onClick={toggleDrawer("navbar", false)}>{t("navbar.stories")}</a>
        </Link>
        <Link href="Jobs">
          <a className="font-navbar" target="_blank" onClick={toggleDrawer("navbar", false)}>{t("navbar.jobs")}</a>
        </Link>
      </div>
      <div className="flex w-full flex-col items-center space-y-5">
        <Link href="/">
          <a className="font-navbar" target="_blank">{t("navbar.company-site")}</a>
        </Link>
      </div>
    </div>
  );
  const srcLogo = logoUrl ? bucketM+logoUrl : logo;
  return (
    <nav className={"fixed top-0 left-0 right-0 w-full bg-white z-20 background-color--white box-shadow-container" + (boxShadow ? " drop-shadow-sm" : "")}>
      <div className="max-w-7xl mx-auto flex h-9 items-center px-5 mobile:justify-between">
        <Link href="/">
            <a className="w-20 mr-16 h-full flex items-center" style={{ backgroundImage: srcLogo ? `url(${srcLogo}})` : srcLogo }}></a>
        </Link>

        <div className="flex w-full mobile:hidden">
          <LinksList></LinksList>
        </div>

        <div className="hidden cursor-pointer mobile:flex">
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.3rem" }} onClick={toggleDrawer("navbar", true)}></FontAwesomeIcon>
        </div>

        <SwipeableDrawer
          anchor={"right"}
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


export default Navbar;
