import React from 'react';
import Slider from "react-slick";

import CarouselItem from './CarouselItem/CarouselItem';
import Aux from 'hocs/Aux/Aux';
import classes from './Carousel.module.css';
import Title from '../../UI/Title/Title';

const carousel = () => {

  var settings = {
    dots: true,
    dotsClass: classes.carouselDot,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <Title className={classes.titleWraper}>
        Categories
      </Title>
      <Slider {...settings}>
        <CarouselItem key="1"/>
        <CarouselItem key="2"/>
        <CarouselItem key="3"/>
        <CarouselItem key="4"/>
        <CarouselItem key="5"/>
        <CarouselItem key="6"/>
        <CarouselItem key="7"/>
        <CarouselItem key="8"/>
        <CarouselItem key="9"/>
        <CarouselItem key="10"/>
        <CarouselItem key="11"/>
      </Slider>
    </div>
  );
}


export default carousel;