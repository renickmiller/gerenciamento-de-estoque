import styles from './Home.module.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Home() {
  let navigate = useNavigate();
  return (
    <div>
      {<NavBar />}
      <div className={styles.body}>
        <h1>
          GERENCIAMENTO <br></br>DE <br></br>ESTOQUE
        </h1>
      </div>
    </div>
  );
}

export default Home;
