import { useTranslation } from "next-i18next";
import Image from "next/image";
import { logo } from "../assets/svg"

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <footer className="pt-10 py-20 bg-white">
          <a className="flex-column flex-align-justify-center cursor-pointer" target="_blank">
            <p className="font-hint">{t('powered-by')}</p>
            {/* <app-refy-logo className="mt-1"></app-refy-logo> */}
            <div className="flex flex-align-center w-10">
              <Image src={logo} alt={'powered by Refy'}/>
            </div>
          </a>
      </footer>
    </>
  )
}
export default Footer
