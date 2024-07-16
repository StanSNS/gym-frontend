import React, {useEffect, useState} from "react";
import './Achievements.css'
import VerticalSwiper from "./VerticalSwiper/VerticalSwiper";
import {FaChartLine, FaPiggyBank, FaShoppingBag, FaUsers} from "react-icons/fa";
import {FaTruckRampBox} from "react-icons/fa6";
import Loader from "../../STATIC/Loader/Loader";
import {getAboutData} from "../../../Service/AboutData";

function Achievements() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [aboutData, setAboutData] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(false);

    const handleSelectIndex = (index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsDataLoading(true);
            try {
                const data = await getAboutData();
                setAboutData(data)
            } catch (error) {
                navigator("/internal-server-error");
                console.error('Error fetching about data:');
            } finally {
                setIsDataLoading(false);
            }
        };
        fetchData();
    }, [navigator]);

    return (
        <>
            {isDataLoading && <Loader/>}

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
                            <span className="number">Над {aboutData?.savedMoney || 0}+</span>
                            <span className="text">Спестени лева</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(2)} className="sliderButton">
                        <div className="circleContent">
                            <FaShoppingBag className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над {aboutData?.soldProducts || 0}+</span>
                            <span className="text">Продадени продукти</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(3)} className="sliderButton">
                        <div className="circleContent">
                            <FaUsers className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над {aboutData?.satisfiedClients || 0}+</span>
                            <span className="text">Задоволени клиента</span>
                        </div>
                    </button>

                    <button onClick={() => handleSelectIndex(4)} className="sliderButton">
                        <div className="circleContent">
                            <FaTruckRampBox className="fs-2 m-1 mb-0"/>
                        </div>

                        <div className="contentText">
                            <span className="number">Над {aboutData?.deliveredProducts || 0}+</span>
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