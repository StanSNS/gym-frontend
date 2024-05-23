import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaQuestion, FaShoppingCart, FaTimes, FaTruck} from "react-icons/fa";
import "./Header.css"
import TrackOrderModal from "../../Modals/User/TrackOrderModal/TrackOrderModal";
import {getCartFromStorage} from "../../../Service/ProductService";
import CartModal from "../../Modals/User/CartModal/CartModal";
import headerImage from "../../../Resources/logoImage.png"
import {FaPeopleGroup} from "react-icons/fa6";
import {AiFillQuestionCircle} from "react-icons/ai";


function Header() {
    const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

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

    const handleRelocateToHomePage = () => {
        window.location.href = "/";
    };


    const handleOffcanvasClose = () => {
        setShowOffcanvas(false);
    };

    const handleOffcanvasShow = () => {
        setShowOffcanvas(true);
    };

    return (
        <>
            <Navbar expand={'md'} className="navbarContainer">
                <Container fluid>
                    <Navbar.Brand>
                        <div className="headerLogo" onClick={handleRelocateToHomePage}>
                            <img src={headerImage} alt="headerImage" className="headerImage"/>
                            GymFit
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`}
                                   className="custom-toggler"
                                   onClick={handleOffcanvasShow}
                    />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`}
                                      aria-labelledby={`offcanvasNavbarLabel-expand-md`} placement="end"
                                      show={showOffcanvas} onHide={handleOffcanvasClose}>
                        <Offcanvas.Header>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                <div className="headerLogo" onClick={handleRelocateToHomePage}>
                                    <img src={headerImage} alt="headerImage" className="headerImage"/>
                                    GymFit
                                </div>
                            </Offcanvas.Title>
                            <button className="closingModalButton" onClick={handleOffcanvasClose}>
                                <FaTimes/>
                            </button>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="d-flex  justify-content-end">
                            <Nav>
                                <Nav.Link href="/faq">
                                    <span className="navLinkContent">
                                        <AiFillQuestionCircle/>
                                        <span className="ms-1">ЧЗВ</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="/about">
                                    <span className="navLinkContent">
                                        <FaPeopleGroup/>
                                        <span className="ms-1">За нас</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link onClick={() => setShowTrackOrderModal(true)}>
                                    <span className="navLinkContent">
                                        <FaTruck/>
                                        <span className="ms-1">Проследяване</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    setShowCartModal(true);
                                }}>
                                    <span className="navLinkContent">
                                        <FaShoppingCart/>
                                        <span className="ms-1">Количка</span>
                                        {productCount > 0 &&
                                            <div className="cartItemCount">{productCount}</div>
                                        }
                                    </span>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>

                <TrackOrderModal show={showTrackOrderModal} handleClose={handleTrackOrderModalClose}/>
                <CartModal show={showCartModal} handleClose={() => setShowCartModal(false)} cartItems={cartItems}/>
            </Navbar>
        </>
    );
}

export default Header;