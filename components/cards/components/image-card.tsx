import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { loaderBucketXL } from "../../../utils/image-loader";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const CardImage = ({pictures, icon}: {pictures: string[], icon: IconProp}) => (
    pictures && pictures?.some(pic => !!pic)
    ? <Image loader={loaderBucketXL} src={pictures[0]} alt='workplace' layout="fill" className="flex relative object-cover" />
    : <div className={`h-full w-full flex items-center justify-center relative background-dynamic`}>
      <div className="w-6 h-9 flex items-center justify-center"><FontAwesomeIcon icon={icon} className='icon-font text-6xl icon-font--light' /></div>
    </div>
)