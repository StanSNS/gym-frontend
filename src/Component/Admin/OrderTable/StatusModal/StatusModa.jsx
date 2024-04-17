import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FaGear} from "react-icons/fa6";
import './StatusModa.css'
import {modifyOrderStatus} from "../../../../Service/AdminService";
import Loader from "../../../STATIC/Loader/Loader";

function StatusModal({show, onHide, selectedOrder}) {
    const [isDataLoading, setIsDataLoading] = useState(false);


    const handleChangeStatus = async (status) => {
        setIsDataLoading(true)
        const response = await modifyOrderStatus(status, selectedOrder.randomNumber);
        if (response.status === 200) {
            selectedOrder.orderStatus = status;
            onHide();
        }
        setIsDataLoading(false)
    };

    return (

        <>
            {isDataLoading && <Loader/>}

            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Change current order status:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {selectedOrder?.orderStatus !== 'PENDING' &&
                            <h5><FaGear className="mb-1 me-1 pending roundedIcon"/>Change the status to:
                                <Button
                                    variant={"dark"}
                                    className="ms-2 pending"
                                    onClick={() => handleChangeStatus("PENDING")}
                                >
                                    PENDING
                                </Button>
                            </h5>
                        }

                        {selectedOrder?.orderStatus !== 'APPROVED' &&
                            <h5><FaGear className="mb-1 me-1 approved roundedIcon"/>Change the status to:
                                <Button
                                    variant={"dark"}
                                    className="ms-2 approved"
                                    onClick={() => handleChangeStatus("APPROVED")}
                                >
                                    APPROVED
                                </Button>
                            </h5>
                        }

                        {selectedOrder?.orderStatus !== 'IN_DELIVERY' &&
                            <h5><FaGear className="mb-1 me-1 in-delivery roundedIcon"/>Change the status to:
                                <Button
                                    variant={"dark"}
                                    className="ms-2 in-delivery"
                                    onClick={() => handleChangeStatus("IN_DELIVERY")}
                                >
                                    IN_DELIVERY
                                </Button>
                            </h5>
                        }

                        {selectedOrder?.orderStatus !== 'COMPLETED' &&
                            <h5><FaGear className="mb-1 me-1 completed roundedIcon"/>Change the status to:
                                <Button
                                    variant={"dark"}
                                    className="ms-2 completed"
                                    onClick={() => handleChangeStatus("COMPLETED")}
                                >
                                    COMPLETED
                                </Button>
                            </h5>
                        }

                        {selectedOrder?.orderStatus !== 'CANCELED' &&
                            <h5><FaGear className="mb-1 me-1 canceled roundedIcon"/>Change the status to:
                                <Button
                                    variant={"dark"}
                                    className="ms-2 canceled"
                                    onClick={() => handleChangeStatus("CANCELED")}
                                >
                                    CANCELED
                                </Button>
                            </h5>
                        }

                    </div>

                </Modal.Body>
            </Modal>
        </>

    );
}

export default StatusModal;
