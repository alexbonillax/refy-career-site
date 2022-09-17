interface LogoProps {
  imgSrc?: string;
  name?: string;
  type?: LogoTypes;
}

export enum LogoTypes {
  company = 'w-5 h-5 rounded-3xl',
  refierCard = 'w-20 h-20 rounded-full'
}

export const Logo = ({ imgSrc, name, type = LogoTypes.company }: LogoProps) => (
  <div className={`${type} bg-cover bg-center`} style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : {}}>
    {
      (!imgSrc && name) &&
      <p className="text-m">{name[0]}</p>
    }
  </div>
)