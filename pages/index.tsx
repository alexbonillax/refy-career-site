import Head from "next/head";
import Image from "next/image";
import type {NextPage} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useState} from "react";
import {
  logo,
  integrations,
  channels,
  banner,
  fidelity_program1,
  fidelity_program2,
  fidelity_program3,
  filter_candidates,
  job_item,
  candidate,
  candidate2,
  candidate3,
} from "../assets/svg";
import {seat_code_white, tropicfeel_white} from "../assets/svg/companies";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faHeart, faTimer, faGem, faSackDollar, faCircleCheck} from "@fortawesome/pro-solid-svg-icons";
import {faLink} from "@fortawesome/pro-regular-svg-icons";
import Container from "../layout/container";
import remoteWork from "../assets/wallpapers/remotework1.jpg";
import IconItem from "../layout/icon-item";

function Translate(text: string, array?: boolean): string {
  const {t} = useTranslation("home");
  return array ? t(text, {returnObjects: true}) : t(text);
}

const Banner1 = () => (
  <Container bgColor="white" classes="flex items-center">
    <div className="flex flex-col w-3/5 mobile:w-full">
      <h1 className="font-big-title mb-5">{Translate("first.title")}</h1>
      <p className="font-subtitle mb-8">{Translate("first.subtitle")}</p>
      <a href="https://refyapp.com/signup-company" target="_blank" rel="noreferrer">
        <button className="button-primary">{Translate("first.button")}</button>
      </a>
      <p className="font-hint mt-4">{Translate("first.hint")}</p>
    </div>
    <div className="flex w-2/5 mobile:w-full items-center justify-center mobile:hidden">
      <Image src={banner} alt="Try Refy for Free"></Image>
    </div>
  </Container>
);

const ReferralProgramBenefits = () => {
  return (
    <Container bgColor="white" classes="flex">
      <div className="flex flex-col items-center justify-center desktop:w-2/5">
        <Image src={filter_candidates} alt="Filter candidates"></Image>
      </div>
      <div className="flex flex-col desktop:w-3/5">
        <h1 className="font-title">{Translate("referral-program-benefits.title")}</h1>
        <h3 className="font-subtitle mt-5 mb-10">{Translate("referral-program-benefits.subtitle")}</h3>
        <IconItem icon={faTimer} title={Translate("referral-program-benefits.time.title")} text={Translate("referral-program-benefits.time.text")}></IconItem>
        <IconItem icon={faGem} title={Translate("referral-program-benefits.quality.title")} text={Translate("referral-program-benefits.quality.text")}/>
        <IconItem icon={faSackDollar} title={Translate("referral-program-benefits.cost.title")} text={Translate("referral-program-benefits.cost.text")}></IconItem>
        <IconItem icon={faHeart} title={Translate("referral-program-benefits.advocacy.title")} text={Translate("referral-program-benefits.advocacy.text")}></IconItem>
        <IconItem icon={faCircleCheck} title={Translate("referral-program-benefits.culture.title")} text={Translate("referral-program-benefits.culture.text")}></IconItem>
      </div>
    </Container>
  );
};

const Proposition = () => {
  const SliderCards = () => {
    const images = [fidelity_program2, fidelity_program3, fidelity_program1];

    interface Program {
      id: number;
      title: string;
      subtitle: string;
    }

    const ProgramCard = ({card}: { card: Program }) => {
      return (
        <div className="flex flex-col w-1/3 mobile:w-full p-8 bg-white rounded-xl drop-shadow-xl">
          <div className="flex justify-center h-60">
            <Image src={images[card.id]} alt={`Fidelity program ${card.id}`} width="200%"></Image>
          </div>
          <div className="pt-4">
            <p className="font-item-title desktop:h-14">{card.title}</p>
            <p className="font-item-text desktop:h-30 mt-4">{card.subtitle}</p>
          </div>
        </div>
      );
    };
    return (
      <>
        <div className="flex justify-center space-x-8 mobile:flex-col mobile:space-x-0 mobile:space-y-5">
          {(Translate(`proposition.cards`, true) as unknown as []).map((card: Program, i) => (
            <ProgramCard key={i} card={{id: i, title: card.title, subtitle: card.subtitle}}></ProgramCard>
          ))}
        </div>
      </>
    );
  };

  return (
    <Container bgColor="gray-100" classes="flex flex-col items-center">
      <h1 className="font-title text-center">{Translate("proposition.title")}</h1>
      <h2 className="font-subtitle text-center mt-5 mb-10" dangerouslySetInnerHTML={{__html: Translate("proposition.subtitle")}}></h2>
      <SliderCards {...{cards: ["fidelity", "money", "mix"]}}></SliderCards> </Container>
  );
};

const Banner2 = () => {
  const SliderCards = ({cards}: { cards: string[] }) => {
    const [program, setProgram] = useState("fidelity");
    const images = [fidelity_program2, fidelity_program3, fidelity_program1];

    interface Program {
      id: number;
      title: string;
      subtitle: string;
    }

    const ProgramCard = ({card}: { card: Program }) => {
      return (
        <div className="flex flex-col w-1/3 mobile:w-full p-8 bg-white rounded-xl drop-shadow-xl">
          <div className="flex justify-center h-60">
            <Image src={images[card.id]} alt={`Fidelity program ${card.id}`} width="200%"></Image>
          </div>
          <div className="pt-4">
            <p className="font-item-title desktop:h-14">{card.title}</p>
            <p className="font-item-text desktop:h-30 mt-4">{card.subtitle}</p>
          </div>
        </div>
      );
    };
    return (
      <>
        <div className="flex bg-white rounded-xl items-center justify-center mb-8 cursor-pointer">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`px-6 mobile:px-4 h-full flex items-center rounded-xl ${program === card ? "bg-primary" : ""}`}
              onClick={() => setProgram(card)}
            >
              <p className={`font-button-toggle ${program === card ? "font-button-toggle-active" : ""}`}>
                {Translate(`second.${card}.title`)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-8 mobile:flex-col mobile:space-x-0 mobile:space-y-5">
          {(Translate(`second.${program}.cards`, true) as unknown as []).map((card: Program, i) => (
            <ProgramCard key={i} card={{id: i, title: card.title, subtitle: card.subtitle}}></ProgramCard>
          ))}
        </div>
      </>
    );
  };

  return (
    <Container bgColor="gray-100" classes="flex flex-col items-center">
      <h1 className="font-title text-center">{Translate("second.title")}</h1>
      <h2 className="font-subtitle text-center mt-5 mb-10">{Translate("second.subtitle")}</h2>
      <SliderCards {...{cards: ["fidelity", "money", "mix"]}}></SliderCards> </Container>
  );
};

const Banner3 = () => (
  <Container bgColor="primary" classes="flex flex-col items-center justify-center">
    <h1 className="font-title--white mb-10">{Translate("third.title")}</h1>
    <div className="flex w-full items-center justify-evenly mobile:flex-col mobile:space-y-16">
      <div className="w-80 h-full">
        <Image src={seat_code_white} alt={"Seat:Code"}/>
      </div>
      <div className="w-80 h-full">
        <Image src={tropicfeel_white} alt={"Tropicfeel"}/>
      </div>
    </div>
  </Container>
);

const Banner4 = () => (
  <Container bgColor="white">
    <div className="flex mobile:flex-col">
      <div className="flex-1 mobile:mb-10">
        <h1 className="font-big-title mb-10">{Translate("fourth.first.title")}</h1>
        <p className="font-hint mb-8">{Translate("fourth.first.hint")}</p>
        <p className="font-text mb-4">{Translate("fourth.first.text-1")}</p>
        <p className="font-text mb-4">{Translate("fourth.first.text-2")}</p>
        <p className="font-text">{Translate("fourth.first.text-3")}</p>
      </div>
      <div className="flex flex-col flex-1 items-center justify-between">
        <div className="relative flex w-80 h-80">
          <div className="absolute flex top-24 flex-col justify-between p-4 w-32 h-40 bg-white rounded-xl drop-shadow-md">
            <Image src={candidate} alt="Candidate 1"></Image>
            <div className="flex items-baseline justify-center">
              <FontAwesomeIcon icon={faHeart} style={{fontSize: "1.2rem", color: "#FE6680"}}></FontAwesomeIcon>
              <p className="font-big-title--mini ml-2">140</p>
            </div>
          </div>
          <div className="absolute flex right-0 top-24 center flex-col justify-between p-4 w-32 h-40 bg-white rounded-xl drop-shadow-md">
            <Image src={candidate2} alt="Candidate 2"></Image>
            <div className="flex items-baseline justify-center">
              <FontAwesomeIcon icon={faHeart} style={{fontSize: "1.2rem", color: "#FE6680"}}></FontAwesomeIcon>
              <p className="font-big-title--mini ml-2">90</p>
            </div>
          </div>
          <div className="absolute flex left-0 right-0 ml-auto mr-auto flex-col justify-between p-4 w-32 h-40 bg-white rounded-xl drop-shadow-md">
            <Image src={candidate3} alt="Candidate 3"></Image>
            <div className="flex items-baseline justify-center">
              <FontAwesomeIcon icon={faHeart} style={{fontSize: "1.2rem", color: "#FE6680"}}></FontAwesomeIcon>
              <p className="font-big-title--mini ml-2">230</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-5 justify-between p-4 w-80 bg-white rounded-xl drop-shadow-md">
          <FontAwesomeIcon
            icon={faSliders}
            style={{
              fontSize: "1.2rem",
              marginBottom: "10px",
              color: "#FE6680",
            }}
          ></FontAwesomeIcon> {(Translate("fourth.first.card.options", true) as unknown as []).map((option, i) => (
          <div key={i} className="flex justify-between">
            <p className="font-hint">{option}</p>
            <p className="font-hint">{Translate(`fourth.first.card.points.${i}`)}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  </Container>
);

const Banner5 = () => {
  const ShareLinkBox = () => (
    <div className="flex flex-col justify-between w-80 h-80 bg-white rounded-xl drop-shadow-md">
      <div className="flex items-center justify-center bg-primary h-24 rounded-t-xl">
        <div className="rounded-lg flex items-center justify-center h-11 px-1 bg-white">
          <Image src={logo} alt={logo} width={38} height={35}></Image>
        </div>
      </div>
      <div
        className="flex items-center h-full justify-center bg-cover font-title--white"
        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${remoteWork.src})`}}
      >
        Head of HR
      </div>
      <div className="flex items-center justify-center bg-white h-28 rounded-b-xl">
        <div className="flex items-center rounded-xl py-2 px-4 bg-gray-100">
          <FontAwesomeIcon icon={faLink} style={{fontSize: "0.8rem", color: "#434F59"}}></FontAwesomeIcon>
          <p className="font-hint--small ml-2">https://share.refyapp.com/jobs/23HTYD</p>
        </div>
      </div>
    </div>
  );
  return (
    <Container bgColor="white">
      <div className="flex mobile:flex-col-reverse">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={job_item} alt="Job item"></Image>
        </div>
        <div className="flex-1 mobile:mb-14">
          <h1 className="font-big-title mb-10">{Translate("fourth.second.title")}</h1>
          <p className="font-text mb-4">{Translate("fourth.second.text-1")}</p>
          <p className="font-text mb-4">{Translate("fourth.second.text-2")}</p>
          <p className="font-text">{Translate("fourth.second.text-3")}</p>
        </div>
      </div>
    </Container>
  );
};

const Banner6 = () => (
  <Container bgColor="white">
    <div className="flex mobile:flex-col">
      <div className="flex-1 mobile:mb-10">
        <h1 className="font-big-title mb-10">{Translate("fourth.third.title")}</h1>
        <p className="font-text mb-4">{Translate("fourth.third.text-1")}</p>
        <p className="font-text mb-4">{Translate("fourth.third.text-2")}</p>
        <p className="font-text">{Translate("fourth.third.text-3")}</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image src={filter_candidates} alt="Filter candidates"></Image>
      </div>
    </div>
  </Container>
);

const Banner7 = () => (
  <Container bgColor="white">
    <div className="flex mobile:flex-col-reverse">
      <div className="flex-1 flex items-center justify-center w-full">
        <Image src={integrations} alt="Integrations"></Image>
      </div>
      <div className="flex-1 mobile:mb-10">
        <h1 className="font-big-title mb-10">{Translate("fourth.fourth.title")}</h1>
        <p className="font-text mb-4">{Translate("fourth.fourth.text-1")}</p>
        <p className="font-text mb-4">{Translate("fourth.fourth.text-2")}</p>
        <p className="font-text mb-4">{Translate("fourth.fourth.text-3")}</p>
        <p className="font-text">{Translate("fourth.fourth.text-4")}</p>
      </div>
    </div>
  </Container>
);

const Banner8 = () => (
  <Container bgColor="white">
    <div className="flex mobile:flex-col">
      <div className="flex-1 mb-10">
        <h1 className="font-big-title mb-10">{Translate("fourth.fifth.title")}</h1>
        <p className="font-text mb-4">{Translate("fourth.fifth.text-1")}</p>
        <p className="font-text mb-4">{Translate("fourth.fifth.text-2")}</p>
        <p className="font-text">{Translate("fourth.fifth.text-3")}</p>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Image src={channels} alt="channels"></Image>
      </div>
    </div>
  </Container>
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{Translate("title") + " | Refy"}</title>
        <meta property="og:title" content={Translate("title")} key={Translate("title")}/>
      </Head>
      <div className="pt-16">
        <Banner1></Banner1> <ReferralProgramBenefits></ReferralProgramBenefits> <Proposition></Proposition>
        <Banner2></Banner2> <Banner3></Banner3>

        <Banner4></Banner4> <Banner5></Banner5> <Banner6></Banner6> <Banner7></Banner7> <Banner8></Banner8>
      </div>
    </>
  );
};

export const getStaticProps = async ({locale}: { locale: string }) => ({
  props: {...(await serverSideTranslations(locale, ["common", "home"]))},
});

export default Home;
