import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  console.log(logo);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          {/* we are using LinkContainer to wrap the Navbar.Brand and Nav.Link components, 
              because we want to use the react-router-bootstrap package to navigate to the cart 
              and login pages and we can't use the Link component from react-router-dom directly with 
              the Nav.Link component from react-bootstrap */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ShopEase" />
              BuyEase
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* use LinkContainer to wrap the Nav.Link components */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
