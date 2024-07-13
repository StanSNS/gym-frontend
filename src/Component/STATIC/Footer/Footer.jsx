import React, {useEffect, useState} from 'react';
import './Footer.css';
import {Link} from "react-router-dom";
import footerImage from "../../../Resources/logoImage.png"
import {FaHeart, FaInfoCircle, FaShoppingCart, FaTiktok, FaTruck} from "react-icons/fa";
import {BiSupport} from "react-icons/bi";
import TrackOrderModal from "../../Modals/TrackOrderModal/TrackOrderModal";
import ContactUsModal from "../../Modals/ContactUsModal/ContactUsModal";
import {AiFillQuestionCircle} from "react-icons/ai";
import CartModal from "../../Modals/CartModal/CartModal";
import {getCartFromStorage} from "../../../Service/LocalStorageUtils";
import {FaBuildingShield, FaPeopleGroup, FaSquareFacebook} from "react-icons/fa6";
import {RiInstagramFill} from "react-icons/ri";


const Footer = () => {
    const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
    const [showContactUsModal, setShowContactUsModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        refreshCartItems();

        const handleClickOutsideCart = (event) => {
            if (!event.target.closest('.cart')) {
                refreshCartItems();
            }
        };

        document.addEventListener('click', handleClickOutsideCart);
        return () => {
            document.removeEventListener('click', handleClickOutsideCart);
        };
    }, []);

    const refreshCartItems = () => {
        const updatedCartItems = getCartFromStorage();
        setCartItems(updatedCartItems);
    };

    const productCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleTrackOrderModalClose = () => {
        setShowTrackOrderModal(false);
    };

    const handleContactUsModalClose = () => {
        setShowContactUsModal(false);
    };

    function handleImageClick() {
        const urlPath = window.location.pathname;

        if (urlPath === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            window.location.href = "/";
        }
    }

    return (
        <div className="footerSection">
            <footer className="footer">
                <Link to={"#"} className="logoLink" onClick={() => handleImageClick()}>
                    <img src={footerImage} alt="footer Icon" className="footerLogoImage"/>
                    <h2 className="mt-1">GymFit</h2>
                </Link>

                <div className="aboutColumn">
                    <div className="columnTitle"><FaInfoCircle className="mb-1 me-2 myGreenBlueColor"/>Информация</div>
                    <Link to={"/about"} className="columnContent">< FaPeopleGroup className="mb-1 me-1"/>За нас</Link>
                    <Link to={"/faq"} className="columnContent"><AiFillQuestionCircle className="mb-1 me-1"/>ЧЗВ</Link>
                    <Link to={"/terms-and-conditions"} className="columnContent"><FaBuildingShield
                        className="mb-1 me-1 ms-1"/>Правила и условия</Link>
                </div>

                <div className="followUsColumn">
                    <div className="columnTitle"><FaHeart className="mb-1 me-2 myGreenBlueColor"/>Последвай ни</div>
                    <Link to={"#"} className="columnContent"><RiInstagramFill className="mb-1 me-1"/>Instagram</Link>
                    <Link to={"#"} className="columnContent"><FaSquareFacebook className="mb-1 me-1"/>Facebook</Link>
                    <Link to={"#"} className="columnContent"><FaTiktok className="mb-1 me-1"/>TikTok</Link>
                </div>

                <button className="footerButton" onClick={() => setShowContactUsModal(true)}>
                    <BiSupport className="mb-1 me-1"/> Свържи се с нас
                </button>

                <button className="footerButton" onClick={() => setShowTrackOrderModal(true)}>
                    <FaTruck className="mb-1 me-1"/> Проследяване
                </button>

                <button className="footerButton" onClick={() => setShowCartModal(true)}>
                    <FaShoppingCart className="mb-1 me-2"/>
                    Продукти в количка
                    {productCount > 0 &&
                        <span className="ms-1 myGreenBlueColor">({productCount})</span>
                    }
                </button>
            </footer>

            <div className="subFooter">
                <span className="subFooterText">© 2024 My future website. All rights reserved.</span>
            </div>

            <TrackOrderModal show={showTrackOrderModal} handleClose={handleTrackOrderModalClose}/>
            <ContactUsModal show={showContactUsModal} handleClose={handleContactUsModalClose}/>
            <CartModal show={showCartModal} handleClose={() => setShowCartModal(false)} cartItems={cartItems}/>
        </div>
    );
}

export default Footer;
