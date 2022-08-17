export const Logo = ({imgSrc = null, name = null}: {imgSrc: string|null, name: string|null}) => (
  <div className="w-6 h-6 rounded-lg bg-cover bg-center" style={imgSrc ? { backgroundImage:`url(${imgSrc})`} : {}}>
    {
      (!imgSrc && name) &&
      <p className="text-m">{name[0]}</p>
    }
  </div>
)