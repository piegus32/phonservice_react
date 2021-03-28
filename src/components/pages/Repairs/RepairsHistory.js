import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions/repair";
import { Table, Container } from "react-bootstrap";

const RepairsHistory = props => {

    useEffect(() => {
        props.fetchCompleteRepairs()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Client</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Completion Date</th>
                        <th>Warranty Date</th>
                        <th>Warranty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.completeRepairList.map((repair, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>
                                        {repair.product.brand + " " + repair.product.model + " " + repair.product.color}
                                    </td>
                                    <td>
                                        {repair.client.name} { }
                                        {repair.client.surname} <div />
                                        Phone : {repair.client.phone}
                                    </td>
                                    <td>{repair.description}</td>
                                    <td>{repair.price} zł</td>
                                    <td>{(new Date(repair.completionDate)).toDateString()}</td>
                                    <td>{(new Date(repair.warrantyDate)).toDateString()}</td>
                                    <td>{repair.warrantyIsActive ? "Active" : "Expired"}</td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
        </Container>
    )
}

const mapStateToProps = state => ({
    completeRepairList: state.Repair.repairData
})

const mapActionsToProps = {
    fetchCompleteRepairs : actions.fetchCompleteRepairs,
}
export default connect(mapStateToProps, mapActionsToProps)(RepairsHistory);


