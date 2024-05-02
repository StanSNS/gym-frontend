import React, {useState} from "react";
import './Achievements.css'
import VerticalSwiper from "./VerticalSwiper/VerticalSwiper";
import {FaChartLine, FaPiggyBank, FaShoppingBag, FaUsers} from "react-icons/fa";
import {FaTruckRampBox} from "react-icons/fa6";

function Achievements() {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleSelectIndex = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <div className="achContainer">
                <div className="leftSide">
                    <span className="fs-1 fw-bolder  mb-2">
                        <FaChartLine className="mb-2 me-2 myGreenBlueColor"/>
                        Статистики
                    </span>

                    <button onClick={() => handleSelectIndex(1)} className="sliderButton">
                        <div className="circleContent">
                            <FaPiggyBank className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над 25895.58</span>
                            <span className="text">Спестени лева</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(2)} className="sliderButton">
                        <div className="circleContent">
                            <FaShoppingBag className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над 1280+</span>
                            <span className="text">Продадени продукти</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(3)} className="sliderButton">
                        <div className="circleContent">
                            <FaUsers className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над 180+</span>
                            <span className="text">Задоволени клиента</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(4)} className="sliderButton">
                        <div className="circleContent">
                            <FaTruckRampBox className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над 300+</span>
                            <span className="text">Доставени пратки</span>
                        </div>
                    </button>
                </div>

                <div className="rightSide">
                    <VerticalSwiper selectedIndex={selectedIndex}/>
                </div>
            </div>
        </>
    );
}

export default Achievements;