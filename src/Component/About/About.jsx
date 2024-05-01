import React from "react";
import './About.css'
import WhyUs from "./WhyUs/WhyUs";
import Achievements from "./Achievements/Achievements";
import MoreInfo from "./MoreInfo/MoreInfo";

function About() {
    return (
        <div className="aboutSection">
            <WhyUs/>

            <Achievements/>

            <MoreInfo/>
        </div>
    );
}

export default About;