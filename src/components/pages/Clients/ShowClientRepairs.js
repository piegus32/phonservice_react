import React from 'react';
import { Modal, Button, Table } from "react-bootstrap"

const ShowClientRepairs = props => {
    return (
        <Modal {...props} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Repairs
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid" dialogClassName="modal-90w">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Descripton</th>
                            <th>Completion Date</th>
                            <th>Warranty</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data && props.data.map((repair, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{repair.description}</td>
                                        <td>{(new Date(repair.completionDate)).toDateString()}</td>
                                        <td>{repair.warrantyIsActive ? "Active" : "Expired"}</td>
                                        <td>{repair.product.brand} {repair.product.model} {repair.product.color}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShowClientRepairs;