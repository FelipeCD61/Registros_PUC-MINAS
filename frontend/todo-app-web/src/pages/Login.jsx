import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Mensageiro

function Login() {
    // Variáveis que guardam o que o utilizador digita
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Ferramenta do React Router para mudar de página
    const navigate = useNavigate();

    // Função que roda quando o botão "Entrar" é clicado
    const handleLogin = async (e) => {
        e.preventDefault(); // Impede o navegador de recarregar a página

        try {
            // Pede ao mensageiro para enviar os dados para o C#
            const response = await api.post('/Auth/login', {
                username: username,
                password: password
            });

            // Se o C# disser OK, ele devolve o Token. Será guardado no cofre
            localStorage.setItem('token', response.data.token);

            // Redireciona o utilizador para a futura página de tarefas
            navigate('/tarefas');

        } catch (err) {
            // Regista o erro no console para poder inspecionar o log
            console.error('Login error:', err);

            // Mostra a mensagem de erro que veio do backend, se houver
            const errorMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                'Erro desconhecido';

            setError(errorMessage);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login - Todo App</h2>
            
            {/* Se houver um erro, mostra uma mensagem em vermelho */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Nome de Utilizador"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Atualiza a variável em tempo real
                    />
                </div>
                <br />
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;