import { bucketXXL } from "../services/urls";

interface BannerProps {
  picture: string;
  tagline: string;
  title?: string;
  height: BannerHeight;
}

export enum BannerHeight {
  fullScreen = 'desktop:h-screen mobile:py-40',
  bigScreen = 'desktop:py-80 mobile:py-40',
  mediumScreen = 'py-40',
}

export const Banner = ({ picture, tagline, title, height }: BannerProps) => {
  const picUrl = picture ? bucketXXL + picture : false;
  return (
    <section id="home-banner" className={`background-color--dark background-center`} style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className={`relative flex-col flex justify-center items-center background-color--blurr-dark ${height}`}>
        <div className="mobile-container flex-col flex justify-center items-center px-3 text-center">
          <h1 className="font-big-title font--white">{title}</h1>
          <h2 className="font-subtitle font--white">{tagline}</h2>
        </div>
      </div>
    </section>
  )
};