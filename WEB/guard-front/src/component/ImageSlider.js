// src/ImageSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const ImageSlider = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNOr6MBcWjXxl2qPvIyzrnd_frqmDqCpW-A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnZWUrRWHkv4C5fgzH3_mx3RISRqkxhQUoA&usqp=CAU',
  ];

  const sliderStyle = {
    height: '100vh',
	  width : '100%',
	  objectFit : 'cover',
    borderRadius: '10px',
  };

  const navigationStyle = {
    color: '#fff',
  };

  const paginationStyle = {
    backgroundColor: '#fff',
  };

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} style={sliderStyle} />
        </SwiperSlide>
      ))}
      <style jsx>{`
        .swiper-button-next, .swiper-button-prev {
          color: ${navigationStyle.color};
        }
        .swiper-pagination-bullet {
          background-color: ${paginationStyle.backgroundColor};
        }
      `}</style>
    </Swiper>
  );
};

export default ImageSlider;

