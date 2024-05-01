import React, {useEffect, useRef} from 'react';

import './VerticalSwiper.css';

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



export default function VerticalSwiper({selectedIndex}) {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(selectedIndex-1);
        }
    }, [selectedIndex]);

    return (
        <div className="verticalSwiperContainer">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={false}
                className="verticalSwiper"
                ref={swiperRef}
                pagination={{ clickable: true }}
                allowTouchMove={false}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    );
}
