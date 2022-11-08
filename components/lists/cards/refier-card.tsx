import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../services/models/profile";
import { bucketL } from "../../../services/urls";
import { Logo, LogoTypes } from "../../logo";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const openLinkedin = (username: string): Window => window.open(`https://www.linkedin.com/in/${username}`, '_blank');
interface RefierCardProps {
  user: Profile,
}
export const RefierCard = ({ user }: RefierCardProps) => {
  const picUrl = user?.attributes.avatar ? bucketL + user.attributes.avatar : '';
  return (
    <div className="flex-column text-center py-2 px-1">
      <div className="flex flex-justify-center">
        <Logo type={LogoTypes.refierCard} imgSrc={picUrl}></Logo>
      </div>
      <div className="flex-column full-width px-2 mt-2">
        <p className="font-title flex flex-align-justify-center">{user.attributes.firstName} {user.attributes.lastName}
          {
            user.attributes.linkedinVanityName &&
            <FontAwesomeIcon
              className='flex h-2 w-2 ml-1 icon-font icon-font--normal icon-font--field-button cursor-pointer'
              icon={faLinkedin as IconProp}
              onClick={_ => openLinkedin(user.attributes.linkedinVanityName)}></FontAwesomeIcon>
          }
        </p>
        <p className="h-3 font-multiline font--grey">{user.attributes.headline}</p>
      </div>
    </div>
  )
}