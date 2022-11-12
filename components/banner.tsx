import { bucketXXL } from "../services/urls";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import { SearchBarAction } from "./input/search-bar-action";

interface BannerProps {
  picture: string;
  tagline: string;
  title?: string;
  height: BannerHeight;
  backButton?: BannerBackButton;
  searchBar?: string;
  onSearch?: (e: string) => void;
}

export enum BannerHeight {
  fullScreen = 'desktop:h-screen mobile:py-10',
  bigScreen = 'py-20',
  mediumScreen = 'py-10',
  smallScreen = 'py-5',
}

export interface BannerBackButton {
  url: string;
  text: string;
}

export const Banner = ({ picture, tagline, title, height, backButton, searchBar, onSearch }: BannerProps) => {
  const picUrl = picture ? bucketXXL + picture : false;
  return (
    <section id="home-banner" className={`background-color--dark background-center`} style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className="relative flex-column background-color--blurr-dark py-10">
        <div className="mobile-container--responsive">
          {backButton &&
            <div className="flex flex-align-center h-8 px-3 full-width">
              <Link href={{ pathname: backButton.url }}>
                <div className='noselect relative flex flex-align-center button button--underline button--underline-light'>
                  <FontAwesomeIcon className="icon-font icon-font--normal icon-font--light mr-1" icon={faArrowLeft} />
                  <p className='font--light'>{backButton.text}</p>
                </div>
              </Link>
            </div>
          }
          <div className={`mobile-container flex-col flex justify-center items-center px-3 text-center ${height}`}>
            <h1 className="font-big-title font--light">{title}</h1>
            <h2 className="font-subtitle font--light my-2">{tagline}</h2>
            {
              searchBar &&
              <SearchBarAction placeholder={searchBar} onClick={value => onSearch(value)} />
            }
          </div>
        </div>
      </div>
    </section>
  )
};