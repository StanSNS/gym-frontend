import * as React from 'react';
import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
    FaDumbbell,
    FaFire,
    FaListAlt,
    FaShoppingBag,
    FaShoppingCart,
    FaTags,
    FaTruck,
    FaUserPlus
} from "react-icons/fa";
import "./Header.css"
import {IoLogIn} from "react-icons/io5";
import {GiCellarBarrels, GiWeightLiftingUp} from "react-icons/gi";
import {ImExit} from "react-icons/im";
import LoginModal from "./Modals/Login/LoginModal";
import TrackOrderModal from "./Modals/TrackOrder/TrackOrder";

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    const handleTrackOrderModalClose = () => {
        setShowTrackOrderModal(false);
    };

    return (
        <>
            <Navbar key={'lg'} expand={'lg'} className="  navbarContainer">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <span className="d-flex align-items-center fw-bolder headerLogo">
                            <FaDumbbell className="me-2"/>GYM
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} className="custom-toggler"/>
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`}
                                      aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                <span className="d-flex align-items-center">  <FaDumbbell className="me-2"/>GYM</span>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-4">
                                <Nav.Link href="#action2" onClick={() => setShowLoginModal(true)}>
                                    <span className="navLinkContent"><IoLogIn/>
                                        <span className="ms-1">Login</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="#action2">
                                    <span className="navLinkContent">
                                        <FaUserPlus/>
                                        <span className="ms-1">Register</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="#action2">
                                     <span className="navLinkContent">
                                         <FaShoppingBag/>
                                         <span className="ms-1">Products</span>
                                     </span><
                                    /Nav.Link>
                                <NavDropdown title={
                                    <span><FaListAlt className="align-content-center mb-1 fw-bolder iconCategories"/>
                                        <span className="ms-1">Categories</span>
                                    </span>} id={`offcanvasNavbarDropdown-expand-lg`} className="navDropDownTitle">
                                    <NavDropdown.Item className="navDropDownItem" href="#action3">
                                        <FaFire className="me-2"/> Fat Burners
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="navDropDownItem" href="#action3">
                                        <GiCellarBarrels className="me-2"/> Proteins
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="navDropDownItem" href="#action3">
                                        <GiWeightLiftingUp className="me-2"/> Gym equipment
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#action2">
                                    <span className="navLinkContent"><FaTags/>
                                        <span className="ms-1">Deals</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link onClick={() => setShowTrackOrderModal(true)}>
                                    <span className="navLinkContent"><FaTruck/>
                                        <span className="ms-1">Track Order</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="#action2">
                                    <span className="navLinkContent">
                                        <FaShoppingCart/>
                                        <span className="ms-1">Cart</span>
                                    </span>
                                </Nav.Link>
                                <Nav.Link href="#action2">
                                    <span className="navLinkContent"><ImExit/>
                                        <span className="ms-1">Logout</span>
                                    </span>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>

                <LoginModal show={showLoginModal} handleClose={handleLoginModalClose}/>
                <TrackOrderModal show={showTrackOrderModal} handleClose={handleTrackOrderModalClose}/>

            </Navbar>
        </>
    );
}

export default Header;