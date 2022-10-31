import { faUserAlien, faUserAstronaut, faUserBountyHunter, faUserCowboy, faUserHairBuns, faUserNinja, faUserNurseHairLong, faUserRobot, faUserSecret, faUserShakespeare, faUserVisor } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LogoProps {
  imgSrc?: string;
  name?: string;
  type?: LogoTypes;
}

export enum LogoTypes {
  company = 'w-5 h-5 rounded-3xl',
  refierCard = 'w-20 h-20 rounded-full'
}

const randomPersonIcon = [faUserCowboy, faUserAlien, faUserAstronaut, faUserRobot, faUserNurseHairLong, faUserVisor, faUserHairBuns, faUserNinja, faUserSecret, faUserBountyHunter, faUserShakespeare];

export const Logo = ({ imgSrc, name, type = LogoTypes.company }: LogoProps) => (
  <div className={`${type} bg-cover bg-center flex flex-align-justify-center ${!imgSrc ? 'background-dynamic': ''}`} style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : { backgroundColor: '' }}>
    {
      (!imgSrc && name) &&
      <p className="text-m">{name[0]}</p>
    }
    {
      (!imgSrc && type === LogoTypes.refierCard) &&
      <FontAwesomeIcon icon={randomPersonIcon[Math.floor(Math.random() * randomPersonIcon.length)]} className="w-10 h-10 icon-font icon-font--light" />
    }
  </div>
)