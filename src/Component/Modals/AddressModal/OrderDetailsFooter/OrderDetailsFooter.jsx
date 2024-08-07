import React, {useState} from 'react';
import {FaShoppingCart, FaTruckLoading, FaWeightHanging, FaBoxOpen} from 'react-icons/fa';
import {IoPricetags, IoPricetag, IoShieldCheckmark} from 'react-icons/io5';
import {GiPiggyBank} from 'react-icons/gi';
import {RiHandCoinFill} from 'react-icons/ri';
import {FaTruckArrowRight} from "react-icons/fa6";
import './OrderDetailsFooter.css'
import {Link} from "react-router-dom";

const OrderDetailsFooter = ({
                                productCount,
                                totalAmount,
                                totalSaving,
                                deliveryPrice,
                                totalWeight,
                                handleSendOrder,
                            }) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <div className="orderDetails">
            <div className="orderDetailsText">
                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <FaShoppingCart className="mb-1 me-1"/>
                        Продукти в количката
                    </span>
                    <span className="customMarginSpacing">{productCount} бр.</span>
                </div>

                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <IoPricetags className="mb-1 me-1"/>
                        Сума без намаление
                    </span>
                    <span className="customMarginSpacing">{totalAmount.toFixed(2)} лв.</span>
                </div>

                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <IoPricetag className="mb-1 me-1"/>
                        Сума с намаление
                    </span>
                    <span className="customMarginSpacing">{(totalAmount - totalSaving).toFixed(2)} лв.</span>
                </div>

                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <GiPiggyBank className="mb-1 me-1"/>
                        Спестявате
                    </span>
                    <span className="customMarginSpacing">{totalSaving.toFixed(2)} лв.</span>
                </div>

                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <FaTruckLoading className="mb-1 me-1"/>
                        Доставка
                    </span>
                    <span className="customMarginSpacing">{deliveryPrice.toFixed(2)} лв.</span>
                </div>

                <div className="addressModalSingleLine">
                     <span className="keyColorInfo me-2">
                        <FaWeightHanging className="mb-1 me-1"/>
                        Тегло
                    </span>
                    <span className="customMarginSpacing">{totalWeight.toFixed(3)} кг.</span>
                </div>

                <div className="addressModalSingleLine">
                    <span className="keyColorInfo me-2">
                        <RiHandCoinFill className="mb-1 me-1"/>
                        Дължима сума при доставка
                    </span>
                    <span className="customMarginSpacing">{(totalAmount - totalSaving + deliveryPrice).toFixed(2)} лв.</span>
                </div>
            </div>

            <div className="buttonBox">
                <div>
                <div className="orderContent">
                        <IoShieldCheckmark/>
                        <FaTruckArrowRight/>
                        <FaBoxOpen/>
                    </div>
                    <h5 className="mt-2 text-center fw-bold">Пазарувай сигурно и надеждно с нас.</h5>
                </div>

                <div className="termAndCondsBox">
                    <h5 className="d-flex flex-column">
                        Съгалсявам се с общите
                        <Link to={"#"} onClick={() => window.location.href="/terms-and-conditions"}>
                            правила и условия
                        </Link>
                    </h5>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={() => setAcceptedTerms(!acceptedTerms)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <button
                    className={`learn-more ${!acceptedTerms ? 'disabled' : ''}`}
                    onClick={handleSendOrder}
                    disabled={!acceptedTerms}
                >
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Поръчай сега</span>
                </button>
            </div>
        </div>
    );
};

export default OrderDetailsFooter;
