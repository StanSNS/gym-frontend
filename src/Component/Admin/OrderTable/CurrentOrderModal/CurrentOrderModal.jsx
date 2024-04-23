import React, {useEffect} from "react";
import {Modal} from "react-bootstrap";
import CurrentOrderProductTable from "./CurrentOrderProductModal/CurrentOrderProductTable";
import {FaBuilding, FaCity, FaEnvelope, FaGlobeAmericas, FaUser} from "react-icons/fa";
import {FaPhoneVolume} from "react-icons/fa6";
import {IoIosPin} from "react-icons/io";

function CurrentOrderModal({show, onHide, selectedOrder}) {

    useEffect(() => {
        console.log(selectedOrder);
    })

    return (
        <Modal show={show} onHide={onHide} className="modal-xl">
            <Modal.Header>
                <Modal.Title>Details for order: #{selectedOrder?.randomNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="orderInfo">
                    <div className="orderUserInfo">
                        <h5 className="me-2 fw-bolder">
                            <FaUser className="mb-1 me-1"/>User Info:
                        </h5>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaUser className="mb-1 me-1"/>Име:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.firstName}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaUser className="mb-1 me-1"/>Фамилия:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.lastName}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaEnvelope className="mb-1 me-1"/>Имейл:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.email}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaPhoneVolume className="mb-1 me-1"/>Телефон:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.phone}
                                </span>
                            </span>
                    </div>

                    <div className="orderAddressInfo">
                        <h5 className="me-2 fw-bolder">
                            <FaBuilding className="mb-1 me-1"/>Address Info:
                        </h5>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaGlobeAmericas className="mb-1 me-1"/>Държава:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.country}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <FaCity className="mb-1 me-1"/>Град:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.town}
                                </span>
                            </span>

                        {selectedOrder?.addressInfo.address && (
                            <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1"/>Адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.address}
                                    </span>
                            </span>
                        )}

                        {selectedOrder?.addressInfo.additionalAddress && (
                            <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1"/>Допълнителен адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.additionalAddress}
                                    </span>
                            </span>
                        )}

                        {selectedOrder?.addressInfo.officeAddress && (
                            <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPin className="mb-1 me-1"/>Офис адрес:
                                    </span>
                                    <span>
                                        {selectedOrder?.addressInfo?.officeAddress}
                                    </span>
                            </span>
                        )}

                    </div>
                </div>

                <div className="mt-4">
                    <CurrentOrderProductTable order={selectedOrder}/>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CurrentOrderModal;
