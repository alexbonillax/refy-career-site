import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { loaderBucketXL } from "../../../../utils/image-loader";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const CardImage = ({pictures, icon, blurr = false}: {pictures: string[], icon: IconProp, blurr?: boolean}) => (
    <div className="absolute full-width full-height">
      {
        pictures && pictures?.some(pic => !!pic)
          ? <Image loader={loaderBucketXL} src={pictures[0]} alt='workplace' fill={true} className="flex relative object-cover" />
          :
          <div className={`absolute top-0 full-width full-height flex flex-align-justify-center relative background-dynamic`}>
            <div className="w-10 h-10 flex items-center justify-center"><FontAwesomeIcon icon={icon} className='icon-font icon-font--light' /></div>
          </div>
      }
      {
        blurr &&
          <div className="absolute background-color--blurr-dark top-0 full-width full-height"></div>
      }
    </div>
)