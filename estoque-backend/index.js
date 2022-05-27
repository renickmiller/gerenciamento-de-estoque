const estoque = 'http://localhost:8080/estoque';

//Requisição para retorno dos dados da api
fetch(estoque)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });
