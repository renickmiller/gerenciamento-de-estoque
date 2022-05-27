import styles from './Home.module.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cadastro">Cadastrar novo Usuário</Nav.Link>
            <Nav.Link href="/estoque">Estoque</Nav.Link>
            <Nav.Link href="/">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
