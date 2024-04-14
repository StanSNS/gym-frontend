import React from "react";
import {Modal} from "react-bootstrap";
import {MdOutlineMoneyOffCsred} from "react-icons/md";
import CurrentOrderProductTable from "./CurrentOrderProductModal/CurrentOrderProductTable";

function CurrentOrderModal({show, onHide, selectedOrder}) {
    return (
        <Modal show={show} onHide={onHide} className="modal-xl">
            <Modal.Header>
                <Modal.Title>Details: #{selectedOrder?.randomNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="orderInfo">
                    <div className="orderUserInfo">
                        <h5 className="me-2 fw-bolder">
                            <MdOutlineMoneyOffCsred className="mb-1"/>User Info:
                        </h5>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Име:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.firstName}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Фамилия:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.lastName}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Имейл:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.email}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Телефон:
                                </span>
                                <span>
                                    {selectedOrder?.userInfo?.phone}
                                </span>
                            </span>
                    </div>

                    <div className="orderAddressInfo">
                        <h5 className="me-2 fw-bolder">
                            <MdOutlineMoneyOffCsred className="mb-1"/>Address Info:
                        </h5>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Държава:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.country}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Град:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.town}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Адрес:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.address}
                                </span>
                            </span>

                        <span className="fw-bolder mt-2">
                                <span className="keyColorInfo me-2">
                                    <MdOutlineMoneyOffCsred className="mb-1"/>Допълнителен адрес:
                                </span>
                                <span>
                                    {selectedOrder?.addressInfo?.additionalAddress}
                                </span>
                            </span>
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
