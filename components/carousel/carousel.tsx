import { loaderBucketL } from "../../utils/image-loader";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/react-splide';
import { createRef, useEffect, useState } from "react";

export interface CarouselItem {
  name: string;
  picture: string;
  shortDescription: string;
  description: string;
}

export const Carousel = ({ items }: { items: CarouselItem[] }) => {
  const [position, setPosition] = useState<number>(0);
  const ref = createRef<Splide>();
  const mainOptions: Options = {
    type: 'slide',
    perPage: 1,
    arrows: false,
    focus: 'center',
    mediaQuery: 'min',
    breakpoints: {
      1279: {
        fixedWidth: '33.33%',
      },
      777: {
        fixedWidth: '50%',
      },
      0: {
        fixedWidth: '100%',
      },
    },
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.splide.on('moved', (i) => setPosition(i));
    }
  });
  return (
    <>
      <div className="mobile-container--responsive flex-column">
        <div className="flex justify-evenly mobile:hidden mobile-container--responsive">
          {
            items.map((item, i) => (
              <button key={i} onClick={() => { ref.current.splide.go(i); setPosition(i)}} className={`font-subtitle font--black transition--opacity ${i === position ? '' : 'opacity--50'}`}>{item.name}</button>
            ))
          }
        </div>
        <Splide options={mainOptions} ref={ref} hasTrack={false} className="my-4">
          <SplideTrack>
            {
              items.map((item, i) => (
                <SplideSlide key={i} className="px-2" onClick={() => { ref.current.splide.go(i); setPosition(i)}}>
                  <CarouselCard item={item} focused={i === position}/>
                </SplideSlide>
              ))
            }
          </SplideTrack>
        </Splide>
        <div className="flex w-full justify-center">
          {
            items.map((_, i) => (
              <div
                key={i}
                onClick={() => { ref.current.splide.go(i); setPosition(i)}}
                className={`w-2 h-2 mx-1 transition--width ${i === position ? 'w-3 background-dynamic' : '' } cursor-pointer rounded-xl box-shadow-container--card background-color--white`}></div>
            ))
          }
        </div>
      </div>
    </>
  )
}


const CarouselCard = ({ item, focused}: { item: CarouselItem, focused: boolean }) => (
  <div className={`flex-column box-shadow-container--card br-var overflow-hidden cursor-pointer transition--opacity ${focused ? '' : 'opacity--50'}`}>
    <Image
      loader={loaderBucketL} src={item.picture} alt={item.name} width={50} height={50}
      className="w-full h-60 desktop:mr-5 object-fit--cover" />
    <div className="flex-column text-center p-3">
      <h1 className="font-title">{item.name}</h1>
      <p className="font-subtitle">{item.shortDescription}</p>
      <div className="font-prose font-prose--condensed text-left mt-1" dangerouslySetInnerHTML={{ __html: item.description }}></div>
    </div>

  </div>
)
