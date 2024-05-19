import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Hero.css";

import left1 from "../../Resources/Hero/left1.jpg";
import left2 from "../../Resources/Hero/left2.jpg";
import left3 from "../../Resources/Hero/left3.jpg";
import left4 from "../../Resources/Hero/left4.jpg";
import left5 from "../../Resources/Hero/left5.jpg";

import right1 from "../../Resources/Hero/right1.jpg";
import right2 from "../../Resources/Hero/right2.jpg";
import right3 from "../../Resources/Hero/right3.jpg";
import right4 from "../../Resources/Hero/right4.jpg";
import right5 from "../../Resources/Hero/right5.jpg";

function Hero() {
    const carouselData = [
        {imagePath: left1, text: "Трудът днес е успехът утре."},
        {imagePath: left2, text: "Тренирай с усмивка за към целта."},
        {imagePath: left3, text: "Сравнявай се със себе си."},
        {imagePath: left4, text: "Сила и увереност във всяка тренировка."},
        {imagePath: left5, text: "Стреми се към напредък, не към перфекционизъм."}
    ];

    const carousel2Images = [
        {imagePath: right1, text: "Промяната започва отвътре."},
        {imagePath: right2, text: "Изкарай максимума от себе си всеки ден."},
        {imagePath: right3, text: "Болката е твоят мотиватор."},
        {imagePath: right4, text: "Започни от нулата и не спирай."},
        {imagePath: right5, text: "Успехът е плод на труда и постоянството."}
    ];

    return (
        <div className="carouselContainer">
            <Carousel data-bs-theme="dark" className="carousel" indicators={false} controls={false} fade={true}>
                {carouselData.map((data, index) => (
                    <Carousel.Item key={index} interval={4000}>
                        <div className="sliderImageContainer1">
                            <img
                                className="sliderImage"
                                src={data.imagePath}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className="carouselTitle">{data.text}</div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Carousel data-bs-theme="dark" className="carousel" indicators={false} controls={false} fade={true}>
                {carousel2Images.map((data, index) => (
                    <Carousel.Item key={index} interval={4000}>
                        <div className="sliderImageContainer2">
                            <img
                                className="sliderImage"
                                src={data.imagePath}
                                alt={`Slide ${index + 1}`}
                            />
                            <div className="carouselTitle">{data.text}</div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Hero;
