"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';
interface MySliserPropsType {
    listOfImages : string[],
    spaceBetween? : number,
    slidePerview? : number,
}

export default function MySlider({listOfImages, spaceBetween = 100,slidePerview = 3 } : MySliserPropsType){
  return (
    <Swiper
       modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidePerview}
      pagination={{ clickable: true }}
      navigation
      loop
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      {listOfImages.map((image ,index) => <SwiperSlide key={index}> <div className="relative w-full h-120 ">
           
            <img 
              src={image} 
              className='w-full h-full object-cover rounded-lg' 
              alt="image"
            />

           
            <div className="absolute inset-0 bg-green-500 opacity-70 rounded-lg"></div>
          </div></SwiperSlide>)}
    </Swiper>
  );
};
