import { stripHtmlTags } from "../utils";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export const Header = ({name}:{name: string}) => {
  const { t } = useTranslation("common");
  return(
  <Head>
    <title>{name + " - " + t("banner.title")}</title>
    <meta property="og:title" content={name + " - " + t("banner.title")} />
    <meta property="og:description" content={stripHtmlTags(t("banner.subtitle"))} />
  </Head>
  )
}
