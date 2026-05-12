import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import Cadastro from '../components/Cadastro';
import '../assets/login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            const response = await api.post('/Auth/login', {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/tarefas');

        } catch (err) {
            setError('Falha no login. Verifica o teu nome de utilizador e senha.');
        }
    };

    return (
        <div className="container-login">
            <h2 className="titulo-login">Login - Todo App</h2>
            
            {error && <div className="mensagem-erro">{error}</div>}
            
            <form onSubmit={handleLogin} className="form-login">
                <input
                    type="text"
                    placeholder="Nome de Utilizador"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-login"
                    required
                />
                
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-login"
                    required
                />
                
                <button type="submit" className="btn-entrar">Entrar</button>
            </form>

            <button onClick={() => setMostrarPopUp(true)} className="btn-alternar-tela">
                Cadastre-se
            </button>

            {mostrarPopUp && <Cadastro onClose={() => setMostrarPopUp(false)} />}

        </div>
    );
}

export default Login;