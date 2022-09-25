import Department from "../services/models/department";
import { bucketXXL } from "../services/urls";

interface BannerProps {
  picture: string;
  tagline: string;
  title?: string;
  fullScreen?: boolean;
}

export const randomPic = (departments: Department[]): string => departments.find(department => !!department.attributes.picture)?.attributes.picture || '';

export const Banner = ({ picture, tagline, title, fullScreen = false }: BannerProps) => {
  const picUrl = picture ? bucketXXL + picture : false;
  return (
    <section id="home-banner" className={`background-color--dark background-center ${fullScreen ? 'h-screen' : ''}`} style={{ backgroundImage: picUrl ? `url(${picUrl})` : '' }}>
      <div className={`relative flex-col flex justify-center items-center background-color--blurr-dark ${fullScreen ? 'h-screen' : 'py-40'}`}>
        <div className="mobile-container flex-col flex justify-center items-center px-3 py-20 text-center">
          <h2 className="font-subtitle font--white">{tagline}</h2>
          <h1 className="font-big-title desktop:text-4xl mobile:text-3xl font--white">{title}</h1>
        </div>
      </div>
    </section>
  )
};