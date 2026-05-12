import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    // O BrowserRouter liga o sistema de navegação do React
    <BrowserRouter>
      <Routes>
        {/* Quando entrar no site (raiz), redireciona logo para o /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* o caminho /login carrega o componente Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Uma rota provisória para provar que o login funcionou */}
        <Route path="/tarefas" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>Login com Sucesso! O CRUD de tarefas ficará aqui.</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;