import styles from './Login.module.css';
import React from 'react';
import { useState } from 'react';
import logo from '../imgs/logo.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';

function Login() {
  const [login, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState([]);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        senha: senha,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setLogado(json);
          setError(false);
          navigate('/home');
        } else {
          setError(true);
          console.log('Usuário Não Cadastrado');
          setLogado([]);
          toast('Usuário não cadastrado!');
        }
      });
  };

  return (
    <div className={styles.login}>
      <img src={logo} alt="Gerenciamento de Estoque" />
      <h1 className={styles.title}>Login do Sistema</h1>
      <form className={styles.form} /*onSubmit={handleSubmit}*/>
        <div className={styles.field}>
          <label htmlFor="text">Login</label>
          <input
            placeholder="Insira o seu login"
            type="text"
            name="login"
            id="login"
            value={login}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Senha</label>
          <input
            placeholder="Informe a sua senha"
            type="password"
            name="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button onClick={onLogin} type="submit">
            Entrar
          </button>
        </div>
        <div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Login;
