import { useState } from 'react';
import { useEffect } from 'react';

const estoque = 'http://localhost:8080/estoque';
const movimentacao = 'http://localhost:8080/movimentacao';
const perfil = 'http://localhost:8080/perfil';
const user = 'http://localhost:8080/user';

function Fetch() {
  const [login, setLogin] = useState('');
  //useEffect(() => {
  fetch(user)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setLogin(data[0].login);
    })
    .catch(function (error) {
      console.log(error);
    });
  //}, []);

  return (
    <div>
      <ul>
        <li>{login}</li>
      </ul>
    </div>
  );
}

export default Fetch;
