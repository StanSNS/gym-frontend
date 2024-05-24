import {Modal} from "react-bootstrap";
import {FaTimesCircle} from "react-icons/fa";
import {IoBag} from "react-icons/io5";
import {LuCandy} from "react-icons/lu";

const UnavailableProductModal = ({ show, onHide, unavailableProductName, unavailableProductTaste }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                <FaTimesCircle className="errorColor mb-1 me-2"/>Продукта не е наличен.
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-column text-center">
                <h2>Моля премахнете следните продукти от количката си.</h2>
                <h5>
                    <IoBag className="mb-2 me-1 errorColor"/>{unavailableProductName} -
                    <LuCandy className="mb-1 ms-1 me-1 errorColor"/>{unavailableProductTaste}
                </h5>
            </div>
        </Modal.Body>
    </Modal>
);

export default UnavailableProductModal;