import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './CartModal.css';
import {PiMinusCircleFill, PiPlusCircleFill} from "react-icons/pi";
import {
    FaPiggyBank,
    FaPlusCircle,
    FaShoppingCart,
    FaTimes,
    FaTimesCircle,
    FaWallet,
    FaWeightHanging
} from "react-icons/fa";
import {GiBank, GiWrappedSweet} from "react-icons/gi";
import {IoIosPricetag} from "react-icons/io";
import {addToCart, getCartFromStorage, reduceQuantityInCart} from "../../../../Service/ProductService";
import AddressModal from "../AddressModal/AddressModal";
import {getAllAddresses} from "../../../../Service/OrderService";
import Loader from "../../../STATIC/Loader/Loader";
import {useNavigate} from "react-router-dom";

function CartModal({show, handleClose}) {
    const [myCartItems, setMyCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const productCount = myCartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSaving, setTotalSaving] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigate();


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

    useEffect(() => {
        const amount = myCartItems.reduce((acc, item) => acc + (item.regularPrice * item.quantity), 0);
        const saving = myCartItems.reduce((acc, item) => acc + ((item.regularPrice - item.discountedPrice) * item.quantity), 0);
        const weight = myCartItems.reduce((acc, item) => acc + (item.weightKg * item.quantity), 0);
        setTotalAmount(amount);
        setTotalSaving(saving);
        setTotalWeight(weight)
    }, [myCartItems]);

    const refreshCartItems = () => {
        const updatedCartItems = getCartFromStorage();
        setMyCartItems(updatedCartItems);
    };

    const handleOpenAddressModalAndLoadAddresses = async () => {
        try {
            setIsLoading(true)
            const data = await getAllAddresses()
            setShowAddressModal(true);
            setAddresses(data);
            setIsLoading(false)
        } catch (error) {
            navigator("/internal-server-error");
            console.error("Failed to load offices: " + error)
        }
    };

    const handleIncreaseQuantity = (product, selectedTaste) => {
        addToCart(product, selectedTaste);
        refreshCartItems();
    };

    const handleDecreaseQuantity = (product, selectedTaste) => {
        reduceQuantityInCart(product, selectedTaste);
        refreshCartItems();
    };

    const handleCloseAddressModal = () => {
        setShowAddressModal(false);
    };

    return (
        <>

            <Modal show={show} onHide={handleClose} className="modal-lg customModal">
                {isLoading && <Loader/>}

                <Modal.Header className="sticky-header d-flex flex-column">

                    <div className="buttonContainer mb-4">
                        <div className="fw-bolder fs-3">
                            <span className=" me-2 fs-3">
                                <FaShoppingCart className="mb-2 me-3 fs-2 myGreenBlueColor"/>Количка
                            </span>
                            ({productCount})
                        </div>

                        <button className="closingModalButton" onClick={() => handleClose()}><FaTimes/></button>
                    </div>

                    <div className="cartProductTotal mb-3">
                        <div className="fw-bolder fs-4">
                            <span className=" me-2 fs-3">
                                <FaWallet className="mb-2 me-3 fs-2 myGreenBlueColor"/>Общо:
                            </span>
                            {(totalAmount - totalSaving).toFixed(2)} лв.
                        </div>
                        <div className="fw-bolder fs-4">
                             <span className="me-2 fs-3">
                                 <FaPiggyBank className="mb-2 me-3 fs-2 myGreenBlueColor"/>Спестявате:
                             </span>
                            {totalSaving.toFixed(2)} лв.
                        </div>
                    </div>

                    {myCartItems.length !== 0 && (
                        <button className="orderButtonCart mt-3 mb-3"
                                onClick={() => handleOpenAddressModalAndLoadAddresses()}>
                            <span><FaPlusCircle className="mb-1 me-2"/>Добави адрес</span>
                        </button>
                    )}
                </Modal.Header>
                <Modal.Body>
                    {myCartItems.length === 0 ? (
                        <h3 className="emptyCartMessage redColorText">
                            <FaTimesCircle className="me-2"/>
                            Няма продукти в количката
                        </h3>
                    ) : (
                        myCartItems.map((product, index) => (
                            <Card key={index} className="cardProductCart">
                                <div className="imageAndQuantityControlContainer">
                                    <Card.Img src={product.image} alt={product.name}/>
                                    <div className="quantityControls">
                                        <button
                                            onClick={() => handleDecreaseQuantity(product, product?.selectedTaste, product.quantity)}
                                            className="quantityControl">
                                            <PiMinusCircleFill/>
                                        </button>

                                        <span className="quantityText mt-1">{product.quantity}</span>

                                        <button onClick={() => handleIncreaseQuantity(product, product?.selectedTaste)}
                                                className="quantityControl">
                                            <PiPlusCircleFill/>
                                        </button>
                                    </div>
                                </div>

                                <Card.Body className="cartCardBody">
                                    <div>
                                        <Card.Title className="fw-bold">
                                            {product.name} - {product.brandEntity.name}
                                        </Card.Title>
                                        <div className="cardBody">
                                            <div className="fw-bolder fs-5">
                                                <span className="keyColorInfo me-2">
                                                    <FaWeightHanging className="mb-1 me-1"/>
                                                    Тегло
                                                </span>
                                                {product.weightKg} кг.
                                            </div>

                                            {product.selectedTaste && (
                                                <div className="fw-bolder mt-1 fs-5">
                                                    <span className="keyColorInfo me-2">
                                                        <GiWrappedSweet className="mb-1 me-1"/>
                                                        Вкус
                                                    </span>
                                                    {product?.selectedTaste.name}
                                                </div>
                                            )}

                                            <div className="fw-bolder mt-1 fs-5">
                                                <span className="keyColorInfo me-2">
                                                    <IoIosPricetag className="mb-1 me-1"/>
                                                    Намалена цена
                                                </span>
                                                {product.discountedPrice.toFixed(2)} лв.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fw-bolder mt-1 fs-5">
                                        <span className="keyColorInfo me-2">
                                            <FaWallet className="mb-1 me-1"/>
                                            Сума
                                        </span>
                                        {(product.discountedPrice * product.quantity).toFixed(2)} лв.
                                    </div>

                                    <div className="fw-bolder mt-1 fs-5">
                                        <span className="keyColorInfo me-2">
                                            <GiBank className="mb-1 me-1"/>
                                            Намаление
                                        </span>
                                        {(product.regularPrice *
                                            product.quantity -
                                            product.discountedPrice *
                                            product.quantity).toFixed(2)} лв.
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Modal.Body>
            </Modal>

            <AddressModal
                show={showAddressModal}
                handleClose={handleCloseAddressModal}
                cartItems={myCartItems}
                totalWeight={totalWeight}
                productCount={productCount}
                totalAmount={totalAmount}
                addresses={addresses}
                totalSaving={totalSaving}
            />


        </>

    );
}

export default CartModal;
