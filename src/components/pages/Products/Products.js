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
    color: ''
}

const Products = props => {

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [showProductsList, setShowProductsList] = useState(false)
    const [showBrands, setShowBrands] = useState(true)
    const { values, setValues, handleInputChange } = useForm(initialFieldValues);
    
    useEffect(() => {
        setLoading(true)
        props.fetchAllProducts()
        props.fetchProductsGroups()
        setLoading(false)
    }, [showBrands]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddForm = () => {
        setShowForm(true);
    }

    const onDelete = id => {
        props.deleteProduct(id)
    }

    const handleFormClose = () => {
        setShowForm(false);
        setValues(initialFieldValues);
        setEdit(false)
    }

    const handleEditForm = (brand, model, color, id) => {
        setValues({ brand: brand, model: model, color: color })
        setEdit(true);
        setCurrentId(id);
        setShowForm(true);
    }
    const handleSubmit = e => {
        e.preventDefault()
        props.createProduct(values)
        setShowForm(false);
        setValues(initialFieldValues);
    }

    const handleEditSubmit = e => {
        e.preventDefault()
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
                <Button variant="secondary" onClick={() => setShowBrands(!showBrands)}>All Brands</Button>
            </ButtonGroup>
            <ProductsManager
                loading={loading}
                productList={props.productList}
                onDelete={onDelete}
                handleEditForm={handleEditForm}
                showProductsList={showProductsList}
                groupedList={props.groupedList} />
            <ProductModal
                showForm={showForm}
                handleFormClose={handleFormClose}
                handleInputChange={handleInputChange}
                values={values} setValues={setValues}
                handleEditSubmit={handleEditSubmit}
                handleSubmit={handleSubmit}
                handleAddForm={handleAddForm}
                edit={edit} setEdit={setEdit} />
            <ProductList 
                groupedList={props.groupedList}
                productList={props.productList}
                loading={loading}
                showBrands={showBrands} />
        </Container>
    );
}

const mapStateToProps = state => ({
    productList: state.Product.productList,
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