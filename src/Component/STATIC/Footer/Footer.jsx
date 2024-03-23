import React, {useState} from 'react';
import './Footer.css';
import {Link} from "react-router-dom";
import footerHeart from "../../Resources/dumbbell.png"
import {FaBolt, FaHeart, FaInfoCircle, FaListAlt, FaTruck} from "react-icons/fa";
import {IoMdMegaphone} from "react-icons/io";
import {BiSupport} from "react-icons/bi";
import TrackOrderModal from "../Header/Modals/TrackOrder/TrackOrder";


const Footer = () => {
    const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);

    const handleTrackOrderModalClose = () => {
        setShowTrackOrderModal(false);
    };

    return (
        <div className="footerSection">

            <footer className="footer">
                <Link to={"#"} className="logoLink ">
                    <img src={footerHeart} alt="footer Icon" className="footerLogoImage"/>
                    <h2 className="mt-1">GYM</h2>
                </Link>

                <div className="aboutColumn">
                    <Link to={"#"} className="columnTitle"><FaInfoCircle className="mb-1"/> Information</Link>
                    <Link to={"#"} className="columnContent">About us</Link>
                    <Link to={"#"} className="columnContent">FAQ</Link>
                    <Link to={"#"} className="columnContent">Terms & conditions</Link>
                </div>

                <div className="followUsColumn">
                    <Link to={"#"} className="columnTitle"><FaHeart className="mb-1"/> Follow us</Link>
                    <Link to={"#"} className="columnContent">Instagram</Link>
                    <Link to={"#"} className="columnContent">Facebook</Link>
                    <Link to={"#"} className="columnContent">TikTok</Link>
                </div>

                <div className="dealsColumn">
                    <Link to={"#"} className="columnTitle"><FaBolt className="mb-1"/> Flash Deals</Link>
                    <Link to={"#"} className="columnContent">Up to 70% off</Link>
                    <Link to={"#"} className="columnContent">Up to 50% off</Link>
                    <Link to={"#"} className="columnContent">Up to 30% off</Link>
                    <Link to={"#"} className="columnContent">Up to 15% off</Link>
                </div>

                <div className="categoryColumn">
                    <Link to={"#"} className="columnTitle"><FaListAlt className="mb-1"/> Category</Link>
                    <Link to={"#"} className="columnContent">Proteins</Link>
                    <Link to={"#"} className="columnContent">Fat Burners</Link>
                    <Link to={"#"} className="columnContent">Gym equipment</Link>
                    <Link to={"#"} className="columnContent">Other category</Link>
                    <Link to={"#"} className="columnContent">And another</Link>
                </div>

                <div className="footerActionButtons">
                    <button className="reportProblemButton"><IoMdMegaphone className="mb-1"/> Report</button>
                    <button className="contactUsButton"><BiSupport className="mb-1"/> Contact us</button>
                    <button className="trackOrderButton" onClick={() => setShowTrackOrderModal(true)}><FaTruck className="mb-1"/> Track order</button>
                </div>
            </footer>

            <div className="subFooter">
                <p className="mt-2">© 2024 My future website name. All rights reserved.</p>
            </div>

            <TrackOrderModal show={showTrackOrderModal} handleClose={handleTrackOrderModalClose}/>
        </div>
    );
}

export default Footer;
