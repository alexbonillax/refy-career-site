import {useTranslation} from "next-i18next";
import {Value} from "../../services/models/values";
import {Carousel, CarouselItem} from "./carousel";
import {SectionProps} from "../../services/models";


export const ValuesSection = ({section, values}: { section: SectionProps, values: Value[] }) => {
  const {t} = useTranslation("common");
  return (
    <>
      {
        section?.visible &&
          <section className="py-10 background-color--grey--0">
              <div className="mobile-container--responsive">
                  <h2 className="font-big-title text-center">{section?.title || t('values')}</h2>
                  {
                    section?.subtitle &&
                      <h3 className="font-subtitle text-center mt-2">{section.subtitle}</h3>
                  }
              </div>
              <div className="mt-5">
                  <Carousel items={ValuesToCarouselItem(values)}/>
              </div>
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