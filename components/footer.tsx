import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { logo } from "../assets/svg"

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <footer className="pt-10 py-20 background-theme">
        <Link href='https://try.refyapp.com' target="_blank">
          <div className="flex-column flex-align-justify-center cursor-pointer">
            <p className="font-hint mb-1">{t('powered-by')}</p>
            <div className="flex flex-align-center w-8">
              <Image src={logo} alt={'powered by Refy'} width={65} height={32} />
            </div>
          </div>
        </Link>
      </footer>
    </>
  )
}
export default Footer
