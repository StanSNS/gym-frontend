import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaShoppingCart, FaTimes, FaTruck} from "react-icons/fa";
import "./Header.css"
import TrackOrderModal from "../../Modals/TrackOrderModal/TrackOrderModal";
import {getCartFromStorage} from "../../../Service/SessionStorageUtils";
import CartModal from "../../Modals/CartModal/CartModal";
import headerImage from "../../../Resources/logoImage.png"
import {FaBuildingShield, FaPeopleGroup, FaTriangleExclamation} from "react-icons/fa6";
import {AiFillQuestionCircle} from "react-icons/ai";
import {getWebTrafficCookie, setWebTrafficCookie} from "../../../Service/CookieService";


function Header() {
    const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showDialog, setShowDialog] = useState(true);

    useEffect(() => {
        if (!getWebTrafficCookie()) {
            setShowDialog(true)
        }

        if (getWebTrafficCookie() === 'true') {
            setShowDialog(false);
        }

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
        const urlPath = window.location.pathname;

        if (urlPath === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            window.location.href = "/";
        }
    };


    const handleOffcanvasClose = () => {
        setShowOffcanvas(false);
    };

    const handleOffcanvasShow = () => {
        setShowOffcanvas(true);
    };

    const handleDialogHide = () => {
        setShowDialog(false);
        setWebTrafficCookie()
    };

    return (
        <>
            <Navbar expand={'lg'} className="navbarContainer">
                <Container fluid>
                    <Navbar.Brand>
                        <div className="headerLogo" onClick={() => handleRelocateToHomePage()}>
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
                        <Offcanvas.Body className="offcanvasBody">
                            <Nav>
                                <Nav.Link href="/terms-and-conditions">
                                    <span className="navLinkContent">
                                        <FaBuildingShield/>
                                        <span className="ms-1">Правила и условия</span>
                                    </span>
                                </Nav.Link>
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

            {showDialog && (
                <div className="webTrafficDisclaimer">
                    <div className="discvlaimerContent">
                        <FaTriangleExclamation className="fs-1 myRedColor"/>

                        <h6 className="disclaimerText">
                            Искаме да ви информираме, че уебсайтът ни се сблъсква с висок трафик, което може да забави
                            обработката и доставката на поръчките. Нашите екипи работят усилено, за да справят с
                            повишеното търсене. Извиняваме се за всяко неудобство и стоим на разположение за въпроси и
                            допълнителна информация. Благодарим за разбирането и търпението.
                        </h6>

                        <FaTriangleExclamation className="fs-1 myRedColor"/>
                    </div>

                    <button className="acceptedDisclaimerButton" onClick={handleDialogHide}>РАЗБРАХ</button>
                </div>
            )}
        </>
    );
}

export default Header;