import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './CartModal.css';
import {PiMinusCircleFill, PiPlusCircleFill} from "react-icons/pi";
import {FaWallet, FaWeightHanging} from "react-icons/fa";
import {GiBank, GiWrappedSweet} from "react-icons/gi";
import {IoIosPricetag} from "react-icons/io";
import {addToCart, getCartFromStorage, reduceQuantityInCart} from "../../../../../Service/ProductService";

function CartModal({show, handleClose, cartItems}) {
    const [myCartItems, setMyCartItems] = useState([]);

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
        setMyCartItems(updatedCartItems);
    };

    const handleIncreaseQuantity = (product, selectedTaste) => {
        addToCart(product, selectedTaste);
        refreshCartItems();
    };

    const handleDecreaseQuantity = (product, selectedTaste) => {
        reduceQuantityInCart(product, selectedTaste);
        refreshCartItems();
    };

    return (
        <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {myCartItems.map((product, index) => (
                    <Card key={index} className="cardProductCart">
                        <div className="imageAndQuantityControlContainer">
                            <Card.Img src={product.image} alt={product.name}/>
                            <div className="quantityControls">
                                <PiMinusCircleFill className="quantityControl"
                                                   onClick={() => handleDecreaseQuantity(product, product.selectedTaste, product.quantity)}/>
                                <span className="quantityText">{product.quantity}</span>
                                <PiPlusCircleFill className="quantityControl"
                                                  onClick={() => handleIncreaseQuantity(product, product.selectedTaste)}/>
                            </div>
                        </div>

                        <Card.Body>
                            <div>
                                <Card.Title>{product.name} - {product.brandEntity.name}</Card.Title>
                                <div className="cardBody">
                                <span className="fw-bolder ">
                                        <span className="keyColorInfo me-2">
                                            <FaWeightHanging className="mb-1"/> Тегло:
                                        </span>
                                    {product.weightKg} кг.
                                </span>

                                    <span className="fw-bolder">
                                        <span className="keyColorInfo me-2">
                                            <GiWrappedSweet className="mb-1"/> Вкус:
                                        </span>
                                        {product.selectedTaste.name}
                                </span>

                                    <span className="fw-bolder">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPricetag className="mb-1"/> Намалена цена:
                                    </span>
                                    <span>
                                        {product.discountedPrice.toFixed(2)}лв
                                    </span>
                                </span>
                                </div>
                            </div>

                            <div className="cardFooterCart">
                                 <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <FaWallet className="mb-1"/> Общо:
                                    </span>
                                    <span>
                                        {(product.discountedPrice * product.quantity).toFixed(2)}лв
                                    </span>
                                </span>

                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <GiBank className="mb-1"/> Спестявате:
                                    </span>
                                    <span>
                                        {(product.regularPrice * product.quantity - product.discountedPrice * product.quantity).toFixed(2)}лв
                                    </span>
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default CartModal;
