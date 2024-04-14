import React from "react";
import {Button, Modal} from "react-bootstrap";
import {FaGear} from "react-icons/fa6";
import './StatusModa.css'

function StatusModal({show, onHide, selectedOrder}) {

    const handleChangeStatus = (status) => {
        selectedOrder.orderStatus = status;
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Status settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5><FaGear className="mb-1 me-1 pending roundedIcon"/>Change the status to:
                        <Button
                            variant={"dark"}
                            className="ms-2 pending"
                            onClick={() => handleChangeStatus("PENDING")}
                        >
                            PENDING
                        </Button>
                    </h5>

                    <h5><FaGear className="mb-1 me-1 approved roundedIcon"/>Change the status to:
                        <Button
                            variant={"dark"}
                            className="ms-2 approved"
                            onClick={() => handleChangeStatus("APPROVED")}
                        >
                            APPROVED
                        </Button>
                    </h5>

                    <h5><FaGear className="mb-1 me-1 in-delivery roundedIcon"/>Change the status to:
                        <Button
                            variant={"dark"}
                            className="ms-2 in-delivery"
                            onClick={() => handleChangeStatus("IN_DELIVERY")}
                        >
                            IN_DELIVERY
                        </Button>
                    </h5>

                    <h5><FaGear className="mb-1 me-1 completed roundedIcon"/>Change the status to:
                        <Button
                            variant={"dark"}
                            className="ms-2 completed"
                            onClick={() => handleChangeStatus("COMPLETED")}
                        >
                            COMPLETED
                        </Button>
                    </h5>

                    <h5><FaGear className="mb-1 me-1 canceled roundedIcon"/>Change the status to:
                        <Button
                            variant={"dark"}
                            className="ms-2 canceled"
                            onClick={() => handleChangeStatus("CANCELED")}
                        >
                            CANCELED
                        </Button>
                    </h5>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default StatusModal;
