import React from "react"
import { Form, Button, Container } from "react-bootstrap";
import * as actions from "../../../actions/auth";
import useForm from '../useForm'
import { connect } from 'react-redux'

const initialFieldValues = {
    username: '',
    password: ''
}

const Login = (props) => {

    const { values, handleInputChange } = useForm(initialFieldValues);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await props.signin(values);
        if (localStorage.getItem("user")) {
            window.location.reload()
        }

    }

    return (
        <Container>
            <h1 style={{textAlign: "center"}}>Please Sign In</h1>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
const mapStateToProps = state => ({
})

const mapActionsToProps = {
    signin: actions.signIn
}

export default connect(mapStateToProps, mapActionsToProps)(Login);