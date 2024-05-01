import React from "react";
import './WhyUs.css'
import {FaDumbbell, FaShippingFast} from "react-icons/fa";
import {IoFitness, IoShieldCheckmark} from "react-icons/io5";

function WhyUs() {
    return (
        <div className="whyContainer">
            <div className="title">
                <h1 className="p-4 pb-0">Защо нас</h1>
                <div className="textLine"></div>
            </div>

            <div className="whyContentContainer">

                <div className="whyContent">
                    <FaDumbbell className="whyIcon rotateIcon"/>
                    <h5>Сила</h5>
                    <p className="fw-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                        deserunt
                        repudiandae tenetur.</p>
                </div>

                <div className="whyContent">
                    <IoFitness  className="whyIcon "/>
                    <h5>Здраве</h5>
                    <p className="fw-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                        deserunt
                        repudiandae tenetur.</p>
                </div>

                <div className="whyContent">
                    <IoShieldCheckmark  className="whyIcon "/>
                    <h5>Качество</h5>
                    <p className="fw-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                        deserunt
                        repudiandae tenetur.</p>
                </div>

                <div className="whyContent">
                    <FaShippingFast  className="whyIcon "/>
                    <h5>Бърза доставка</h5>
                    <p className="fw-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                        deserunt
                        repudiandae tenetur.</p>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;