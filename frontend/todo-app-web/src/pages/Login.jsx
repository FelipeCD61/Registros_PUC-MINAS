import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
// IMPORTANTE: Trazemos o estilo da pasta assets
import '../assets/login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
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
            
            {/* A mensagem de erro agora tem um fundo vermelho claro para destacar */}
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
        </div>
    );
}

export default Login;