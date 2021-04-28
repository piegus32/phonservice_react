import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions/client";
import { Container } from "react-bootstrap";
import ClientList from "./ClientList"
import ClientForm from "./ClientForm"
import useForm from "../useForm"

const initialFieldValues = {
    name: '',
    surname: '',
    phone: '',
    email: ''
}

const Clients = props => {

    useEffect(() => {
        props.fetchAllClients()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const [showForm, setShowForm] = useState(false)
    const [edit, setEdit] = useState(false)
    const { values, setValues, handleInputChange } = useForm(initialFieldValues);
    
    const HandleSaveButton = e =>{
        e.preventDefault();
        if(edit){
           values.phone = parseInt(values.phone);
           props.updateClient(values.id, values)
           setEdit(!edit);
           setShowForm(false);
        }
        else {
            values.phone = parseInt(values.phone);
            props.createClient(values)
        }

        setValues(initialFieldValues)
        window.location.reload()
    }

    const HandleDeleteButton = id => {
        props.deleteClient(id);
    }

    return ( 
        <Container>
            <ClientForm 
            showForm={showForm}
            setShowForm={setShowForm}
            setEdit={setEdit}
            handleInputChange={handleInputChange}
            HandleSaveButton={HandleSaveButton}
            values={values} setValues={setValues}
            initialFieldValues={initialFieldValues}
            />
            <ClientList
            showForm={showForm}
            setShowForm={setShowForm} 
            clientList={props.clientList}
            setValues={setValues}
            edit={edit} setEdit={setEdit}
            HandleDeleteButton={HandleDeleteButton} />
        </Container>
     );
}
const mapStateToProps = state => ({
    clientList: state.Client.clientlist
})

const mapActionsToProps = {
    fetchAllClients: actions.fetchAll,
    createClient: actions.create,
    deleteClient: actions.Delete,
    updateClient: actions.update
}
export default connect(mapStateToProps, mapActionsToProps)(Clients);