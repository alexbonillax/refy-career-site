import Department from "../services/models/department";
import { bucketXXL } from "../services/urls";

interface BannerProps {
  picture: string;
  tagline: string;
  title?: string;
}

export const randomPic = (departments: Department[]): string => departments.find(department => !!department.attributes.picture)?.attributes.picture || '';

export const Banner = ({ picture, tagline, title }: BannerProps) => {
  const picUrl = picture ? bucketXXL + picture : false;
  return (<section id="home-banner" className="background-color--dark background-center" style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
    <div className="relative flex-col flex-align-justify-center background-color--blurr-dark desktop:py-40">
      <div className="mobile-container flex-col flex-justify-center flex-align-center px-3 py-20 text-center">
        <p className="font-subtitle font--white">{tagline}</p>
        <p className="font-big-title font-big-title--46 font--white">{title}</p>
      </div>
    </div>
  </section>)
};