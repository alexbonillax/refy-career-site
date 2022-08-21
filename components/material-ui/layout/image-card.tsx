import Image, {StaticImageData} from "next/image";

const ImageCard = ({image, title, text}: { image: StaticImageData; title: string; text: string; }) => (
  <div className="flex flex-col w-1/3 mobile:w-full p-8 bg-white rounded-xl drop-shadow-xl">
    <div className="flex justify-center h-60">
      <Image src={image} alt={title} width="200%"></Image>
    </div>
    <div className="pt-4">
      <p className="font-item-title desktop:h-14">{title}</p>
      <p className="font-item-text desktop:h-30 mt-4" dangerouslySetInnerHTML={{__html: text}}></p>
    </div>
  </div>
);

export default ImageCard;
