import { Container, Typography } from '@material-ui/core';
import React from 'react'


const Home = () => {
    const { username, id } = JSON.parse(localStorage.getItem('user'));;

    return (
        <Container>
            <Typography style={{ position: "right" }}>
                Welcome, {username}!
                id: {id}
            </Typography>
        </Container>
    );
}

export default Home;