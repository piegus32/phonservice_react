import React from "react"
import { Form, Button } from "react-bootstrap";
import "./client.css"

const ClientForm = props => {

    const HandleAddButton = () => {
        if(props.showForm){
            props.setValues(props.initialFieldValues)
        }
        else{
            props.setShowForm(!props.showForm)
        }
    }

    const HandleClearButton = () => {
        props.setValues(props.initialFieldValues)
        props.setEdit(false);
    }

    const HandleCloseButton = () => {
        props.setShowForm(!props.showForm)
        props.setEdit(false);
        props.setValues(props.initialFieldValues);
    }

    return (
        <div>
            <Button className="addbutton" onClick={() => HandleAddButton()}>Add New</Button>
            {props.showForm &&
                <Form className="form">
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            placeholder="Name"
                            name="name"
                            value={props.values.name}
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            placeholder="Surname"
                            name="surname"
                            value={props.values.surname}
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="phone"
                            name="phone"
                            pattern="^-?[0-9]\d*\.?\d*$"
                            value={props.values.phone}
                            placeholder="Enter phone"
                            onChange={props.handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={props.values.email}
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={props.HandleSaveButton}>Save</Button>{' '}
                    <Button variant="outline-secondary" onClick={() => HandleClearButton()}>Clear</Button>{' '}
                    <Button variant="outline-secondary" onClick={() => HandleCloseButton()}>Close</Button>{' '}
                </Form>}
        </div>
    )
}

export default ClientForm;