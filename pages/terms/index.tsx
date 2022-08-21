import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Container from "../../components/material-ui/layout/container";

function TranslateCommon(text: string, array?: boolean): string {
  const {t} = useTranslation("common");
  return array ? t(text, {returnObjects: true}) : t(text);
}

function TranslateCookies(text: string, array?: boolean): string {
  const {t} = useTranslation("terms");
  return array ? t(text, {returnObjects: true}) : t(text);
}

const Terms: NextPage = () => {
  return (
    <>
      <Head>
        <title>{TranslateCommon("footer.terms") + ' | Refy'}</title>
        <meta property="og:title" content={TranslateCommon("footer.terms")} key={TranslateCommon("footer.terms")}/>
      </Head>
        <Container bgColor="white">
          <h1 className="font-title mt-10">{TranslateCookies("title")}</h1>
          <p dangerouslySetInnerHTML={{ __html: TranslateCookies("description")}}></p>
          <p>{TranslateCookies("subtitle")}</p>
          <ul className="mt-5 list-disc space-y-5">
            <li>{TranslateCookies("point1")}</li>
            <li>{TranslateCookies("point2")}</li>
            <li>{TranslateCookies("point3")}</li>
            <li>{TranslateCookies("point4")}</li>
          </ul>
          <p className="mt-10 font-subtitle">{TranslateCookies("subtitle2")}</p>
          <ul className="mt-5 list-disc space-y-5">
            <li>{TranslateCookies("owner")}</li>
            <li>{TranslateCookies("direction")}</li>
            <li>{TranslateCookies("nif")}</li>
            <li>{TranslateCookies("email")}</li>
            <li>{TranslateCookies("phone")}</li>
            <li>{TranslateCookies("register")}</li>
          </ul>
          <h1 className="font-title mt-10">{TranslateCookies("title3")}</h1>
          <p>{TranslateCookies("description3")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title4")}</h1>
          <p>{TranslateCookies("description4")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title5")}</h1>
          <p>{TranslateCookies("description5")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title6")}</h1>
          <p>{TranslateCookies("description6")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title7")}</h1>
          <p>{TranslateCookies("description7")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title8")}</h1>
          <h1 className="font-title mt-10">{TranslateCookies("title9")}</h1>
          <p>{TranslateCookies("description9")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title10")}</h1>
          <p>{TranslateCookies("description10")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title11")}</h1>
          <p>{TranslateCookies("description11")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title12")}</h1>
          <p>{TranslateCookies("description12")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title13")}</h1>
          <h1 className="font-title mt-10">{TranslateCookies("title14")}</h1>
          <p>{TranslateCookies("description14")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title15")}</h1>
          <p>{TranslateCookies("description15")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title16")}</h1>
          <p>{TranslateCookies("description16")}</p>
          <h1 className="font-title mt-10">{TranslateCookies("title17")}</h1>
          <p>{TranslateCookies("description17")}</p>
        </Container> 
    </>
  );
};

export const getStaticProps = async ({locale}: { locale: string }) => ({
  props: {...(await serverSideTranslations(locale, ["common", "terms"]))},
});

export default Terms;