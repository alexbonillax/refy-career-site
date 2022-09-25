import Department from "../services/models/department";
import { bucketXXL } from "../services/urls";

interface BannerProps {
  picture: string;
  tagline: string;
  title?: string;
  height: BannerHeight;
}

export enum BannerHeight {
  fullScreen = 'h-screen',
  bigScreen = 'py-80',
  mediumScreen = 'py-40',
}

export const randomPic = (departments: Department[]): string => departments.find(department => !!department.attributes.picture)?.attributes.picture || '';

export const Banner = ({ picture, tagline, title, height }: BannerProps) => {
  const picUrl = picture ? bucketXXL + picture : false;
  return (
    <section id="home-banner" className={`background-color--dark background-center ${height === BannerHeight.fullScreen ? height : ''}`} style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className={`relative flex-col flex justify-center items-center background-color--blurr-dark ${height}`}>
        <div className="mobile-container flex-col flex justify-center items-center px-3 text-center">
          <h2 className="font-subtitle font--white">{tagline}</h2>
          <h1 className="font-big-title font--white">{title}</h1>
        </div>
      </div>
    </section>
  )
};