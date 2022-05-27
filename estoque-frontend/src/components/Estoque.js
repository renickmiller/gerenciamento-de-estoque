import styles from './Estoque.module.css';
import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabela from './Tabela';

function Estoque() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const closeAndSave = (e) => {
    setShow(false);
    console.log(produt, quantidade, cod);
    e.preventDefault();

    fetch('http://localhost:8080/estoque', {
      method: 'POST',
      body: JSON.stringify({
        nome: produt,
        qtd: quantidade,
        cod: cod,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    toast('Peça cadastrada com sucesso!');
  };

  const [produt, setProdut] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [cod, setCod] = useState('');

  return (
    <div>
      {<NavBar />}
      <div className={styles.newprodut}>
        <button onClick={handleShow}>Cadastrar novo produto</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.form} />
          <div className={styles.field}>
            <label htmlFor="text">Nome Produto</label>
            <div>
              <input
                placeholder="Nome do produto"
                type="text"
                name="nome"
                id="nome"
                value={produt}
                onChange={(e) => setProdut(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="number">Código</label>
            <input
              placeholder="Código do produto"
              type="number"
              name="codigo"
              id="codigo"
              value={cod}
              onChange={(e) => setCod(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={closeAndSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <ToastContainer />
      </div>
      <Tabela />
    </div>
  );
}

export default Estoque;
