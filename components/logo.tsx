import { faPerson, faUserAlien, faUserAstronaut, faUserBountyHunter, faUserCowboy, faUserHairBuns, faUserNinja, faUserNurseHairLong, faUserRobot, faUserSecret, faUserShakespeare, faUserVisor } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LogoProps {
  imgSrc?: string;
  name?: string;
  type?: LogoTypes;
  color?: string;
}

export enum LogoTypes {
  company = 'w-5 h-5 rounded-3xl',
  refierCard = 'w-20 h-20 rounded-full'
}

const randomPersonIcon = [faUserCowboy, faUserAlien, faUserAstronaut, faUserRobot, faUserNurseHairLong, faUserVisor, faUserHairBuns, faUserNinja, faUserSecret, faUserBountyHunter, faUserShakespeare];

export const Logo = ({ imgSrc, name, type = LogoTypes.company, color }: LogoProps) => (
  <div className={`${type} bg-cover bg-center flex flex-align-justify-center`} style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : { backgroundColor: color }}>
    {
      (!imgSrc && name) &&
      <p className="text-m">{name[0]}</p>
    }
    {
      (color && !imgSrc && type === LogoTypes.refierCard) &&
      <FontAwesomeIcon icon={randomPersonIcon[Math.floor(Math.random() * randomPersonIcon.length)]} className="h-3/6 font-icon font--white" />
    }
  </div>
)