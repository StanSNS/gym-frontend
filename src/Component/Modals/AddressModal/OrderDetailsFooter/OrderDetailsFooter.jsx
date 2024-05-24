import React from 'react';
import {FaShoppingCart, FaTruckLoading, FaWeightHanging, FaBoxOpen} from 'react-icons/fa';
import {IoPricetags, IoPricetag, IoShieldCheckmark} from 'react-icons/io5';
import {GiPiggyBank} from 'react-icons/gi';
import {RiHandCoinFill} from 'react-icons/ri';
import {FaTruckArrowRight} from "react-icons/fa6";
import './OrderDetailsFooter.css'

const OrderDetailsFooter = ({
                                productCount,
                                totalAmount,
                                totalSaving,
                                deliveryPrice,
                                totalWeight,
                                handleSendOrder
                            }) => {
    return (
        <div className="orderDetails">
            <div className="orderDetailsText">
                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <FaShoppingCart className="mb-1 me-1"/>
                        Продукти в количката
                    </span>
                    {productCount} бр.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <IoPricetags className="mb-1 me-1"/>
                        Сума без намаление
                    </span>
                    {totalAmount.toFixed(2)} лв.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <IoPricetag className="mb-1 me-1"/>
                        Сума с намаление
                    </span>
                    {(totalAmount - totalSaving).toFixed(2)} лв.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <GiPiggyBank className="mb-1 me-1"/>
                        Спестявате
                    </span>
                    {totalSaving.toFixed(2)} лв.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <FaTruckLoading className="mb-1 me-1"/>
                        Доставка
                    </span>
                    {deliveryPrice.toFixed(2)} лв.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                     <span className="keyColorInfo me-2">
                        <FaWeightHanging className="mb-1 me-1"/>
                        Тегло
                    </span>
                    {totalWeight.toFixed(3)} кг.
                </div>

                <div className="fw-bolder fs-5 mt-1">
                    <span className="keyColorInfo me-2">
                        <RiHandCoinFill className="mb-1 me-1"/>
                        Дължима сума при доставка
                    </span>
                    {(totalAmount - totalSaving + deliveryPrice).toFixed(2)} лв.
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

                <button className="learn-more" onClick={() => handleSendOrder()}>
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
