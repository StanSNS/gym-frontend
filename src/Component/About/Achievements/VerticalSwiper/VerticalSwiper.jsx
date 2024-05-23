import React, {useEffect, useRef, useState} from 'react';

import './VerticalSwiper.css';

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function VerticalSwiper({selectedIndex}) {
    const swiperRef = useRef(null);
    const [autoSlideIndex, setAutoSlideIndex] = useState(0);
    const autoSlideInterval = 5000;

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(selectedIndex - 1);
        }
    }, [selectedIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                const swiper = swiperRef.current.swiper;
                const newIndex = (autoSlideIndex + 1) % swiper.slides.length;
                swiper.slideTo(newIndex);
                setAutoSlideIndex(newIndex);
            }
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [autoSlideIndex]);

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
