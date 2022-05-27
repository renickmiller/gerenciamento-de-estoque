const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());
const router = express.Router();
app.use(express.json());

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'renick123456',
  database: 'gerenciamentodeestoque',
});

//Função que executa os métodos no bd
function execSQLQuery(sqlQry, res) {
  connection.query(sqlQry, function (error, results, fields) {
    if (error) res.json(error);
    else res.json(results);
    console.log('executou!');
  });
}

//Inicia o Servidor
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});

//Definindo Rotas | Método GET (Listando)

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/estoque', (req, res) => {
  execSQLQuery('SELECT * FROM estoque', res);
});
router.get('/movimentacao', (req, res) => {
  execSQLQuery('SELECT * FROM movimentacao', res);
});
router.get('/perfil', (req, res) => {
  execSQLQuery('SELECT * FROM perfil', res);
});
router.get('/user', (req, res) => {
  execSQLQuery('SELECT * FROM user', res);
});

//Pesquisa por ID

router.get('/estoque/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE id_estoque=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM estoque' + filter, res);
});

router.get('/movimentacao/:id?', (req, res) => {
  let filter = '';
  if (req.params.id)
    filter = ' WHERE id_movimentacao=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM movimentacao' + filter, res);
});

router.get('/perfil/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE id_perfil=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM perfil' + filter, res);
});

router.get('/user/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE id_user=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM user' + filter, res);
});

//Deletando um registro (Necessário ID)
router.delete('/estoque/:id', (req, res) => {
  execSQLQuery(
    'DELETE FROM estoque WHERE id_estoque=' + parseInt(req.params.id),
    res,
  );
});

router.delete('/movimentacao/:id', (req, res) => {
  execSQLQuery(
    'DELETE FROM movimentacao WHERE id_movimentacao=' + parseInt(req.params.id),
    res,
  );
});

router.delete('/perfil/:id', (req, res) => {
  execSQLQuery(
    'DELETE FROM perfil WHERE id_perfil=' + parseInt(req.params.id),
    res,
  );
});

router.delete('/user/:id', (req, res) => {
  execSQLQuery(
    'DELETE FROM user WHERE id_user=' + parseInt(req.params.id),
    res,
  );
});

// Adicionando dados nas tabelas
router.use(bodyParser.urlencoded({ extended: false }));

//Estoque
router.post('/estoque', (req, res) => {
  const nome = req.body.nome;
  const qtd = 0;
  const cod = req.body.cod;
  execSQLQuery(
    `INSERT INTO estoque (nome_produto, quantidade, codigo) VALUES('${nome}','${qtd}','${cod}')`,
    res,
  );
});

//Movimentação
router.post('/movimentacao', (req, res) => {
  const tipo_movimentacao = req.body.tipo_movimentacao;
  const qtd_movimentada = req.body.qtd_movimentada;
  const qtd_anterior = req.body.qtd_anterior;
  const id_estoque = req.body.id_estoque;
  execSQLQuery(
    `INSERT INTO movimentacao (tipo_movimentacao, qtd_movimentada, qtd_anterior, id_estoque) VALUES('${tipo_movimentacao}','${qtd_movimentada}','${qtd_anterior}','${id_estoque}')`,
    res,
  );
});

//Perfil
router.post('/perfil', (req, res) => {
  //const id = req.body.id;
  const nome = req.body.nome;
  execSQLQuery(`INSERT INTO perfil (nome) VALUES('${nome}')`, res);
});

//Login
router.post('/login', (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;

  execSQLQuery(
    `SELECT * FROM user WHERE login = '${login}' AND senha = '${senha}'`,
    res,
  );
});

//User
router.post('/user', (req, res) => {
  //const id = req.body.id;
  const login = req.body.login;
  const senha = req.body.senha;
  const telefone = req.body.telefone;
  const cargo = req.body.cargo;
  const endereco = req.body.endereco;
  const id_perfil = req.body.id_perfil;
  //if (cargo == true) {
  execSQLQuery(
    `INSERT INTO user (login, senha, telefone, cargo, endereco, id_perfil) VALUES('${login}','${senha}','${telefone}','${cargo}','${endereco}','${id_perfil}')`,
    res,
  );
});

//Alterando dados da tabela

router.patch('/estoque/:id', (req, res) => {
  const id = req.params.id;
  const nome_produto = req.body.nome_produto;
  const qtd = req.body.qtd;
  if (nome_produto) {
    execSQLQuery(
      `UPDATE estoque SET nome_produto='${nome_produto}' WHERE id_estoque=${id}`,
      res,
    );
  } else if (qtd) {
    execSQLQuery(
      `UPDATE estoque SET quantidade='${qtd}' WHERE id_estoque=${id}`,
      res,
    );
  }
});

router.patch('/movimentacao/:id', (req, res) => {
  const id = req.params.id;
  const tipo = req.body.tipo;
  const qtd_movimentada = req.body.qtd_movimentada;
  const qtd_anterior = req.body.qtd_anterior;
  execSQLQuery(
    `UPDATE movimentacao SET tipo_movimentacao='${tipo}', qtd_movimentada='${qtd_movimentada}', qtd_anterior='${qtd_anterior}' WHERE id_movimentacao=${id}`,
    res,
  );
});

router.patch('/perfil/:id', (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  execSQLQuery(`UPDATE perfil SET nome='${nome}' WHERE id_perfil=${id}`, res);
});

router.patch('/user/:id', (req, res) => {
  const id = req.params.id;
  const login = req.body.login;
  const senha = req.body.senha;
  const telefone = req.body.telefone;
  const cargo = req.body.cargo;
  const endereco = req.body.endereco;
  execSQLQuery(
    `UPDATE user SET login='${login}', senha='${senha}', telefone='${telefone}', cargo='${cargo}', endereco='${endereco}' WHERE id_user=${id}`,
    res,
  );
});
