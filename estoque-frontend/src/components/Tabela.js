import styles from './Tabela.module.css';
import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsPencilSquare, BsPlusSquare, BsFileMinus } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

function Tabela() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idEstoque, setIdEstoque] = useState();
  const [nameProdut, setNameProdut] = useState('');
  const [qtdPecas, setQtdPecas] = useState();
  const [qtdPecasEntrada, setQtdPecasEntrada] = useState('');
  const [qtdPecasSaida, setQtdPecasSaida] = useState('');
  const estoque = 'http://localhost:8080/estoque';

  //Manipulacao do modal edicao
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Manipulacao do modal Entrada
  const [showE, setShowE] = useState(false);
  const handleCloseE = () => setShowE(false);
  const handleShowE = () => setShowE(true);

  //Manipulacao do modal Saída
  const [showS, setShowS] = useState(false);
  const handleCloseS = () => setShowS(false);
  const handleShowS = () => setShowS(true);

  function openModalEdicao(nomeProduto, id) {
    handleShow();
    setNameProdut(nomeProduto);
    setIdEstoque(id);
  }

  function openModalEntrada(qtd, id) {
    handleShowE();
    setIdEstoque(id);
    setQtdPecas(qtd);
  }

  function openModalSaida(qtd, id) {
    handleShowS();
    setIdEstoque(id);
    setQtdPecas(qtd);
  }

  function patchEntrada(id) {
    fetch('http://localhost:8080/estoque/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        qtd: parseInt(qtdPecas) + parseInt(qtdPecasEntrada),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(true);
      });
  }

  function patchSaida(id) {
    fetch('http://localhost:8080/estoque/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        qtd: parseInt(qtdPecas) - parseInt(qtdPecasSaida),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(true);
      });
  }

  const saveMovimentEntrada = (e) => {
    e.preventDefault();
    console.log('submit', { idEstoque, qtdPecas, qtdPecasEntrada });

    fetch('http://localhost:8080/movimentacao', {
      method: 'POST',
      body: JSON.stringify({
        tipo_movimentacao: 'E',
        qtd_movimentada: qtdPecasEntrada,
        qtd_anterior: qtdPecas,
        id_estoque: idEstoque,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        handleCloseE();
        patchEntrada(idEstoque);
        toast('Movimentação de Entrada bem-sucedida!');
      });
  };

  const saveMovimentSaida = (e) => {
    e.preventDefault();
    console.log('submit', { idEstoque, qtdPecas, qtdPecasSaida });

    fetch('http://localhost:8080/movimentacao', {
      method: 'POST',
      body: JSON.stringify({
        tipo_movimentacao: 'S',
        qtd_movimentada: qtdPecasSaida,
        qtd_anterior: qtdPecas,
        id_estoque: idEstoque,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        handleCloseS();
        patchSaida(idEstoque);
        toast('Movimentação de Saída bem-sucedida!');
      });
  };

  useEffect(() => {
    axios(estoque)
      .then((response) => {
        setLista(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
      .finally(() => {
        setLoading(false);
        console.log('Produto cadastrado com sucesso', lista);
      });
  }, [loading]);

  function putAndHandleClose(id) {
    fetch('http://localhost:8080/estoque/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        nome_produto: nameProdut,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        handleClose();
        toast('Nome do produto Alterado com Sucesso!');
        setLoading(true);
      });
  }

  return (
    <div className={styles.table}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome Produto</th>
            <th>Quantidade</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((d) => {
            return (
              <tr>
                <td>{d.codigo}</td>
                <td>{d.nome_produto}</td>
                <td>{d.quantidade}</td>
                <div className={styles.botoes}>
                  <td>
                    <div>
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Editar nome
                            </Tooltip>
                          }
                        >
                          <button
                            variant="secondary"
                            onClick={() =>
                              openModalEdicao(d.nome_produto, d.id_estoque)
                            }
                            className={styles.editar}
                          >
                            <BsPencilSquare />
                          </button>
                        </OverlayTrigger>
                      ))}
                    </div>

                    <div>
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Entrada de estoque
                            </Tooltip>
                          }
                        >
                          <button
                            variant="secondary"
                            onClick={() =>
                              openModalEntrada(d.quantidade, d.id_estoque)
                            }
                            className={styles.entrada}
                          >
                            <BsPlusSquare />
                          </button>
                        </OverlayTrigger>
                      ))}
                    </div>
                    <div>
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              Saída de estoque
                            </Tooltip>
                          }
                        >
                          <button
                            variant="secondary"
                            onClick={() =>
                              openModalSaida(d.quantidade, d.id_estoque)
                            }
                            className={styles.saida}
                          >
                            <BsFileMinus />
                          </button>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </td>
                </div>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar nome do produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={styles.form} />
            <div className={styles.field}>
              <label htmlFor="text">Novo nome para o Produto</label>
              <div>
                <input
                  placeholder={nameProdut}
                  type="text"
                  name="nome"
                  id="nome"
                  value={nameProdut}
                  onChange={(e) => setNameProdut(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                putAndHandleClose(idEstoque);
              }}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal show={showE} onHide={handleCloseE}>
          <Modal.Header closeButton>
            <Modal.Title>Entrada de Peças</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={styles.form} />
            <div className={styles.field}>
              <label htmlFor="text">Quantidade Atual: {qtdPecas}</label>
            </div>
            <div className={styles.field}>
              <label htmlFor="number">Quantidade de Entrada de Peças</label>
              <div>
                <input
                  placeholder="Quantidade"
                  type="number"
                  name="qtdPecasEntrada"
                  id="qtdPecasEntrada"
                  value={qtdPecasEntrada}
                  onChange={(e) => setQtdPecasEntrada(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseE}>
              Fechar
            </Button>
            <Button variant="primary" onClick={saveMovimentEntrada}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal show={showS} onHide={handleCloseS}>
          <Modal.Header closeButton>
            <Modal.Title>Entrada de Peças</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={styles.form} />
            <div className={styles.field}>
              <label htmlFor="text">Quantidade Atual: {qtdPecas}</label>
            </div>
            <div className={styles.field}>
              <label htmlFor="number">Quantidade de Saída de Peças</label>
              <div>
                <input
                  placeholder="Quantidade"
                  type="number"
                  name="qtdPecasEntrada"
                  id="qtdPecasEntrada"
                  value={qtdPecasSaida}
                  onChange={(e) => setQtdPecasSaida(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseS}>
              Fechar
            </Button>
            <Button variant="primary" onClick={saveMovimentSaida}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Tabela;
