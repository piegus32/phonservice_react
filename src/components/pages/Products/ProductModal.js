import React from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

const ProductModal = props => {
    return (
        <div>
            <Modal show={props.showForm} onHide={props.handleFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-4">
                        <FormControl
                            placeholder="Brand"
                            aria-describedby="basic-addon2"
                            name="brand"
                            value={props.values.brand}
                            onChange={props.handleInputChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <FormControl
                            placeholder="Model"
                            aria-describedby="basic-addon2"
                            name="model"
                            value={props.values.model}
                            onChange={props.handleInputChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <FormControl
                            placeholder="Color"
                            aria-describedby="basic-addon2"
                            name="color"
                            value={props.values.color}
                            onChange={props.handleInputChange} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleFormClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={props.edit ? props.handleEditSubmit : props.handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProductModal;