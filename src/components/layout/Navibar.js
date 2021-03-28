import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";

function logout() {
    localStorage.clear()
    window.location.reload()
    // Revoke token on logout -> revoke-token POST API
}

const Navibar = () => (
  <Navbar bg="light" expand="lg" style={{marginBottom: "20px"}}>
    <Navbar.Brand href="/">iCracked</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/clients">Clients</Nav.Link>
        <NavDropdown title="Repairs" id="basic-nav-dropdown">
          <NavDropdown.Item href="/repairs">To do</NavDropdown.Item>
          <NavDropdown.Item href="/repairs/add-new">Add New</NavDropdown.Item>
          <NavDropdown.Item href="/repairs/history">History</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Button onClick={() => logout()}>Logout</Button>
    </Navbar.Collapse>
  </Navbar>
)

export default Navibar;