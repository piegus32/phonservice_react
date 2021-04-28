import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Container, Form, FormLabel, Button } from "react-bootstrap";
import * as repairActions from "../../../actions/repair";
import * as productActions from "../../../actions/product";
import * as clientActions from "../../../actions/client";
import "./repairs.css"
import useForm from "../useForm"
import Select from 'react-select'

const initialFieldValues = {
    warranty: '',
    price: '',
    description: '',
    clientid: '',
    productid: ''
}

const warrantyTimes = [
    { value: 1, label: '1 Month' },
    { value: 3, label: '3 Months' },
    { value: 6, label: '6 Months' },
    { value: 12, label: '12 Months' }
];

const AddNewRepair = (props) => {

    useEffect(() => {
        props.fetchAllProducts();
        props.fetchAllClients();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { values, setValues, handleInputChange } = useForm(initialFieldValues);

    const productOptions = [];
    const clientOptions = [];
    props.productList.forEach(product => {
        productOptions.push({ value: product.id, label: product.brand + " " + product.model + " " + product.color })
    })

    props.clientList.forEach(client => {
        clientOptions.push({ value: client.id, label: client.name + " " + client.surname + " - Phone " + client.phone })
    })

    const handleChange = (selected, options) => {
        setValues({
            ...values,
            [options.name]: selected.value,
        })
        console.log(values)
    };

    const HandleAddButton = () => {
        values.price = parseInt(values.price);
        props.addRepair(values);
        window.location.reload()

        //TODO: ADD pop-up message after add iteam with succes or bad message
    }

    return (
        <Container>
            <Form className="formStyle">
                <Form.Group controlId="exampleForm.ControlInput1">
                    <FormLabel>Product</FormLabel>
                    <Select
                        autoFocus
                        name="productid"
                        placeholder="Select Product..."
                        options={productOptions}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <FormLabel>Client</FormLabel>
                    <Select
                        name="clientid"
                        placeholder="Select Client..."
                        options={clientOptions}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <FormLabel>Description</FormLabel>
                    <Form.Control as="textarea" rows={2}
                        name="description"
                        value={values.description}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <FormLabel>Price</FormLabel>
                    <Form.Control
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Warranty</Form.Label>
                    <Select
                        type="number"
                        name="warranty"
                        placeholder="Warranty time..."
                        options={warrantyTimes}
                        onChange={handleChange} />
                </Form.Group>
                <Button variant="outline-primary" onClick={HandleAddButton}>Save</Button>{' '}
            </Form>
        </Container>
    )
}

const mapStateToProps = state => ({
    productList: state.Product.productList,
    clientList: state.Client.clientlist
})

const mapActionsToProps = {
    addRepair: repairActions.create,
    fetchAllClients: clientActions.fetchAll,
    fetchAllProducts: productActions.fetchAll
}
export default connect(mapStateToProps, mapActionsToProps)(AddNewRepair);