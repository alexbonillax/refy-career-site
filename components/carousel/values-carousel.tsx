import { Value } from "../../services/models/values";
import { Carousel, CarouselItem } from "./carousel";


export const ValuesCarousel = ({ values }: { values: Value[] }) => (
  <section className="py-10 background-color--grey--0">
    <h1 className="font-big-title text-center mb-4">Values</h1>
    <Carousel items={ValuesToCarouselItem(values)} />
  </section>
)

export const ValuesToCarouselItem = (values: Value[]): CarouselItem[] => {
  if (values.length <= 0) { return };
  const items = values.map(value => {
    return {
      name: value.attributes.name,
      picture: value.attributes.pictures[0],
      shortDescription: value.attributes.shortDescription
    } as CarouselItem
  });
  return items;
}