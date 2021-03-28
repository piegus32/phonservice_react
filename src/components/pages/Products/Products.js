import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions/product";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import useForm from "../useForm"
import ProductList from "./ProductList"
import ProductModal from "./ProductModal"
import ProductsManager from "./ProductsManager"

const initialFieldValues = {
    brand: '',
    model: '',
    color: '',
}

const Products = props => {

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [showProductsList, setShowProductsList] = useState(false)
    const { values, setValues, handleInputChange } = useForm(initialFieldValues);
    
    const fetchProducts = () => {
        setLoading(true);
        props.fetchProductsGroups()
        props.fetchAllProducts()
        setLoading(false);
    }
    useEffect(() => {
        fetchProducts()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddForm = () => {
        setShowForm(true);
    }

    const onDelete = id => {
        props.deleteProduct(id)
    }
    const handleFormClose = () => {
        setShowForm(false);
        setValues(initialFieldValues);
        setEdit(true)
    }

    const handleEditForm = (brand, model, color, id) => {
        setValues({ brand: brand, model: model, color: color })
        setEdit(true);
        setCurrentId(id);
        setShowForm(true);
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        props.createProduct(values)
        setShowForm(false);
        setValues(initialFieldValues);
        window.location.reload();
    }

    const handleEditSubmit = e => {
        e.preventDefault()
        console.log(values)
        props.updateProduct(currentId, values)
        setShowForm(false);
        setEdit(false);
        setValues(initialFieldValues);
    }

    return (
        <Container>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={handleAddForm}>Add Product</Button>
                <Button variant="secondary" onClick={() => setShowProductsList(!showProductsList)}>Manage Products</Button>
            </ButtonGroup>
            <ProductsManager
                loading={loading}
                productList={props.productList}
                onDelete={onDelete}
                handleEditForm={handleEditForm}
                showProductsList={showProductsList} />
            <ProductModal
                showForm={showForm}
                handleFormClose={handleFormClose}
                handleInputChange={handleInputChange}
                values={values} setValues={setValues}
                handleEditSubmit={handleEditSubmit}
                handleSubmit={handleSubmit}
                handleAddForm={handleAddForm}
                edit={edit} setEdit={setEdit} />
            <ProductList productList={props.groupedList} loading={loading} />
        </Container>
    );
}

const mapStateToProps = state => ({
    productList: state.Product.productlist.sort((a, b) => a.brand < b.brand ? 1 : -1),
    groupedList: state.Product.groupedList
})

const mapActionsToProps = {
    fetchProductsGroups: actions.fetchGroups,
    fetchAllProducts: actions.fetchAll,
    deleteProduct: actions.Delete,
    createProduct: actions.create,
    updateProduct: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(Products);