import styles from './Cadastro.module.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';

function Cadastro() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit', { login, senha, telefone, cargo, endereco, perfil });

    fetch('http://localhost:8080/user', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        senha: senha,
        telefone: telefone,
        cargo: cargo,
        endereco: endereco,
        id_perfil: perfil,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    toast('Usuário cadastrado com sucesso!');
  };

  return (
    <div>
      {<NavBar />}
      <div className={styles.cadastro}>
        <h2>Crie sua conta</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="login"> Login</label>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Login para acesso ao sistema"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="senha"> Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Informe sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="telefone"> Telefone</label>
            <input
              type="text"
              name="telefone"
              id="telefone"
              placeholder="Informe seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="cargo"> Cargo</label>
            <input
              type="text"
              name="cargo"
              id="cargo"
              placeholder="Informe o seu cargo na empresa"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="endereço"> Endereço </label>
            <input
              type="text"
              name="enredeço"
              id="ebredeço"
              placeholder="Ex: Rua de exemplo, n 22, centro, SP"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="Perfil"> Perfil </label>
          </div>
          <div className={styles.radio}>
            <input
              type="radio"
              name="perfil"
              id="administrador"
              value="1"
              onChange={(e) => setPerfil(e.target.value)}
            />
            <label htmlFor="Administrador">Administrador</label>
          </div>
          <div className={styles.radio}>
            <input
              type="radio"
              name="perfil"
              id="atendente"
              value="2"
              onChange={(e) => setPerfil(e.target.value)}
            />
            <label htmlFor="Administrador">Atendente</label>
          </div>
          <div className={styles.actions}>
            <button type="submit">Cadastrar</button>
          </div>
          <div>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
