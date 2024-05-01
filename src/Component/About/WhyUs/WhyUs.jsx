import React from "react";
import './WhyUs.css'
import {FaDumbbell, FaShippingFast} from "react-icons/fa";
import {IoFitness, IoShieldCheckmark} from "react-icons/io5";

function WhyUs() {
    return (
        <div className="whyContainer">
            <div className="title">
                <h1>Защо нас</h1>
                <div className="textLine"></div>
            </div>

            <div className="whyContentContainer">
                <div className="whyContent">
                    <FaDumbbell className="whyIcon rotateIcon"/>
                    <h4 className="myGreenBlueColor">Сила</h4>
                    <span className="whyText">От ключово значение за постигането на вашите цели. Нашите добавки ви
                        помагат да изградите силата, която ви е необходима.</span>
                </div>

                <div className="whyContent">
                    <IoFitness className="whyIcon"/>
                    <h4 className="myGreenBlueColor">Здраве</h4>
                    <span className="whyText">Вашата най-голяма ценност. Нашите продукти се грижат за вашия здравословен
                        начин на живот.</span>
                </div>

                <div className="whyContent">
                    <IoShieldCheckmark className="whyIcon"/>
                    <h4 className="myGreenBlueColor">Качество</h4>
                    <span className="whyText">Ние поставяме високи стандарти за качество, за да ви предложим само
                        най-доброто за вашето благополучие.</span>
                </div>

                <div className="whyContent">
                    <FaShippingFast className="whyIcon"/>
                    <h4 className="myGreenBlueColor">Бърза доставка</h4>
                    <span className="whyText">Вашето удобство е наш приоритет. Доставяме вашите продукти бързо и
                        надеждно, за да ви осигурим комфорт и увереност.</span>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;