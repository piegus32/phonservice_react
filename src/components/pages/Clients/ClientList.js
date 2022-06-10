import React, { useState } from 'react'
import { Table, Button, Container } from "react-bootstrap";
import ShowClientRepairs from './ShowClientRepairs';

const ClientList = props => {
    const [ showRepairs, setshowRepairs ] = useState(false);
    const [ data, setData ] = useState();

    const showRepairsList = (repairList) => {
        if(repairList.length === 0){
            window.alert("There are no repairs for selected client.")
        }
        else{
            setData(repairList);
            setshowRepairs(true);
        }
    }

    const handleEdit = data =>{
        props.setEdit(true);
        props.setValues(
            {
                id: data.id,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                email: data.email
            }
        )
        if(!props.showForm){
            props.setShowForm(!props.showForm)
        }
    }

    return (
        <Container>
            <ShowClientRepairs 
            show={showRepairs} onHide={() => setshowRepairs(false)} data={data} />
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.clientList.map((client, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{client.name}</td>
                                    <td>{client.surname}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.email}</td>
                                    <td>
                                    <Button variant="outline-info" onClick={() => showRepairsList(client.repairs)} >Show Repairs</Button> { ' ' }
                                    <Button variant="light" onClick={() => handleEdit(client)}>Edit</Button> {' '}
                                    <Button variant="outline-danger" onClick = {() => props.HandleDeleteButton(client.id)} >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default ClientList;