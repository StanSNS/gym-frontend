import React, {useEffect, useRef, useState} from 'react';

import './VerticalSwiper.css';

import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import saveMoney from "../../../../Resources/About/saveMoney.jpg"
import soldProducts from "../../../../Resources/About/soldProducts.jpg"
import satisfiedClients from "../../../../Resources/About/satisfiedClients.jpg"
import deliveredProdcuts from "../../../../Resources/About/deliveredProdcuts.jpg"

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
                <SwiperSlide><img src={saveMoney} alt="saveMoney" className="swiperSlideAboutImage"/></SwiperSlide>
                <SwiperSlide><img src={soldProducts} alt="soldProducts" className="swiperSlideAboutImage"/></SwiperSlide>
                <SwiperSlide><img src={satisfiedClients} alt="satisfiedClients" className="swiperSlideAboutImage"/></SwiperSlide>
                <SwiperSlide><img src={deliveredProdcuts} alt="deliveredProdcuts" className="swiperSlideAboutImage"/></SwiperSlide>
            </Swiper>
        </div>
    );
}
