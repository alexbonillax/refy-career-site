import {useTranslation} from "next-i18next";
import {Value} from "../../services/models/values";
import {Carousel, CarouselItem} from "./carousel";


export const ValuesCarousel = ({values}: { values: Value[] }) => {
  const {t} = useTranslation("common");
  return (
    <>
      {
        values?.length > 0 &&
          <section className="py-10 background-color--grey--0">
              <h1 className="font-big-title text-center mb-4">{t('values')}</h1>
              <Carousel items={ValuesToCarouselItem(values)}/>
          </section>
      }
    </>
  )
}

export const ValuesToCarouselItem = (values: Value[]): CarouselItem[] => {
  const items = values.map(value => {
    return {
      name: value.attributes.name,
      picture: value.attributes.pictures[0],
      shortDescription: value.attributes.shortDescription,
      description: value.attributes.description
    } as CarouselItem
  });
  return items;
}