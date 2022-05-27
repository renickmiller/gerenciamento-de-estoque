import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import Estoque from './components/Estoque';

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
