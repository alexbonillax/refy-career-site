interface LogoProps {
  imgSrc?: string;
  name?: string;
}

export const Logo = ({imgSrc, name}: LogoProps) => (
  <div className="w-5 h-5 rounded-3xl bg-cover bg-center" style={imgSrc ? { backgroundImage:`url(${imgSrc})`} : {}}>
    {
      (!imgSrc && name) &&
      <p className="text-m">{name[0]}</p>
    }
  </div>
)