import React from 'react';
import Modal from 'react-bootstrap/Modal';

function AddressModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} className="address-modal modal-lg">
            {/* Your address modal content here */}
            {/* For example, input fields for address */}
        </Modal>
    );
}

export default AddressModal;
