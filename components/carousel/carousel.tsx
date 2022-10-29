import { loaderBucketL } from "../../utils/image-loader";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/react-splide';
import { createRef, useEffect, useState } from "react";

export interface CarouselItem {
  name: string;
  picture: string;
  shortDescription: string;
}

export const Carousel = ({ items }: { items: CarouselItem[] }) => {
  const [position, setPosition] = useState<number>(0);
  const ref = createRef<Splide>();
  const mainOptions: Options = {
    type: 'loop',
    padding: '10rem',
    gap: '2em',
    height: 'auto',
    perPage: 1,
    fixedWidth: '70rem',
    arrows: false,
    focus: 'center',
    breakpoints: {
      1279: {
        padding: '2rem',
        fixedWidth: '40rem',
      },
      745: {
        fixedWidth: '25rem',
      }
    },
  };
  useEffect(() => { 
    if (ref.current) { 
      ref.current.splide.on('moved', (i) => setPosition(i));
    } 
  });
  return (
    <>
      <div className="flex w-full mb-10 justify-evenly mobile:hidden mobile-container--responsive">
        {
          items.map((item, i) => (
            <button key={i} onClick={() => { ref.current.splide.go(i); setPosition(i)}} className={`font-prose ${i === position ? 'font-bold' : ''}`}>{item.name}</button>
          ))
        }
      </div>
      <Splide options={mainOptions} ref={ref} hasTrack={false} className="my-4">
        <SplideTrack>
          {
            items.map((item, i) => (
              <SplideSlide key={i} className="box-shadow-container--card br-var">
                <CarouselCard item={item} />
              </SplideSlide>
            ))
          }
        </SplideTrack>
      </Splide>
      <div className="flex w-full justify-center">
      <div className="flex w-52 justify-evenly">
        {
          items.map((_, i) => (
            <div 
              key={i} 
              onClick={() => { ref.current.splide.go(i); setPosition(i)}} 
              className={`w-3 h-3 ${i === position ? 'w-4 background-dynamic' : '' } cursor-pointer rounded-xl box-shadow-container--card background-color--white`}></div>
          ))
        }
      </div>
      </div>
    </>
  )
}


const CarouselCard = ({ item }: { item: CarouselItem }) => (
  <div className="flex mobile:flex-col overflow-hidden desktop:flex-row-reverse p-3 br-var background-color--white">
    <div className="desktop:w-1/2 mobile:w-full desktop:ml-5 mobile:mb-5">
      <h1 className="font-title">{item.name}</h1>
      <p className="font-multiline">{item.shortDescription}</p>
    </div>
    <Image
      loader={loaderBucketL} src={item.picture} alt={item.name} width={50} height={50}
      className="flex desktop:w-1/2 mobile:w-full h-72 desktop:mr-5 mobile:mb-5 relative object-cover br-var" />
  </div>
)
