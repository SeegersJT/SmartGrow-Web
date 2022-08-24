import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap'

const Header = () => {
    return (
      <Navbar style={{ backgroundColor : '#002347'}} variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img className='logo' src="smartgrow_logo_reduced_size.png" alt="logo"/></Navbar.Brand>
          <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
              <Badge className='m-2' bg="secondary">ClientImg</Badge>
          </Navbar.Text>
          
        </Container>
      </Navbar>
    );
  }

export default Header