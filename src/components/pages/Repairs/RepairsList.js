import React from 'react'
import { Table, Container, Button } from "react-bootstrap";

const RepairList = props => {
    return (
        <Container>
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Client</th>
                        <th>Repair</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.repairList.map((repair, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {repair.product.brand + " " + repair.product.model + " " + repair.product.color}
                                    </td>
                                    <td>
                                        {repair.client.name} { }
                                        {repair.client.surname} { "| " }
                                        Phone : {repair.client.phone}
                                    </td>
                                    <td>{repair.description}</td>
                                    <td>{repair.price} zł</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => props.HandleDeleteButton(repair.id)}>Delete</Button> { }
                                        <Button variant="primary" onClick={() => props.MarkAsComplete(repair.id)}>Complete</Button>
                                    </td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default RepairList;
