import Image, {StaticImageData} from "next/image";
import {faQuoteLeft, faQuoteRight} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PeopleCard = ({backgroundImage, image, name, text}: { backgroundImage: StaticImageData; image: StaticImageData; name: string; text: string; }) => (
  <div className="flex flex-col w-1/3 mobile:w-full bg-white rounded-xl drop-shadow-xl overflow-hidden">
    <div className="relative flex justify-center h-60 px-8">
      <Image src={backgroundImage} alt={name} className="object-contain"></Image>
      <div className="absolute translate-y-[1rem] w-20 h-20 bottom-0 rounded-full drop-shadow-xl overflow-hidden">
        <Image src={image} alt={name}></Image>
      </div>
    </div>
    <div className="p-8 text-center">
      <p className="font-item-title desktop:h-7">{name}</p>
      <FontAwesomeIcon icon={faQuoteLeft} className="font-icon color-primary mt-5"></FontAwesomeIcon>
      <p className="font-item-text desktop:h-30 mt-4" dangerouslySetInnerHTML={{__html: text}}></p>
      <FontAwesomeIcon icon={faQuoteRight} className="font-icon color-primary mt-5"></FontAwesomeIcon>
    </div>
  </div>
);

export default PeopleCard;
