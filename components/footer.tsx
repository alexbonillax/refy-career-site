import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { logo } from "../assets/svg"
import { DynamicTheme } from "../utils/dynamic-styles/dynamic-theme";
import { ToggleDarkTheme } from "./toggle";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <footer className="pt-10 py-16 space-y-5 flex flex-col items-center background-theme">
        <Link href='https://try.refyapp.com' target="_blank">
          <div className="flex-column flex-align-justify-center cursor-pointer">
            <p className="font-hint mb-1">{t('powered-by')}</p>
            <div className="flex flex-align-center w-8">
              <Image src={logo} alt={'powered by Refy'} width={65} height={32} />
            </div>
          </div>
        </Link>
        <ToggleDarkTheme onClick={e => DynamicTheme(e)} />
      </footer>
    </>
  )
}
export default Footer
