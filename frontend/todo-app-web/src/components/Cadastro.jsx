import { useState } from 'react';
import api from '../services/api';
import '../assets/cadastro.css';

function Cadastro({ onClose }) { // Recebe a função para fechar o pop-up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault();
        setMensagemErro('');
        setSucesso(false);

        try {
            await api.post('/Auth/register', { username, password });
            setSucesso(true);
            
            // Fecha o pop-up automaticamente após 1.5s
            setTimeout(() => {
                onClose();
            }, 1500);
            } catch (err) {
            // 1. Verifica se o servidor respondeu com um erro (status 400)
            if (err.response && err.response.status === 400) {
                
                const dadosErro = err.response.data;

                // 2. Se o erro for a string direta "Este nome de utilizador já está em uso."
                if (typeof dadosErro === 'string') {
                    setMensagemErro(dadosErro);
                } 
                // 3. Se o erro vier das validações do RegisterDto (ModelState)
                else if (dadosErro.errors) {
                    const mensagens = Object.values(dadosErro.errors).flat().join(" ");
                    setMensagemErro(mensagens);
                }
                // 4. Caso o erro venha num formato de objeto simples { message: "..." }
                else if (dadosErro.message) {
                    setMensagemErro(dadosErro.message);
                }
            } else {
                setMensagemErro("Ocorreu um erro ao comunicar com o servidor.");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="titulo-cadastro">Criar Conta</h2>
                
                {sucesso && (
                    <div className="mensagem-sucesso">
                        Conta criada com sucesso! A fechar...
                    </div>
                )}

                {/* Exibição condicional da mensagem de erro */}
                {mensagemErro && (
                    <div className="mensagem-erro">
                        {mensagemErro}
                    </div>
                )}
                
                <form onSubmit={handleCadastro} className="form-cadastro">
                    <input type="text" placeholder="Utilizador" value={username} onChange={(e) => setUsername(e.target.value)} className="input-cadastro" required />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="input-cadastro" required />
                    <button type="submit" className="btn-cadastrar">Cadastrar</button>
                </form>
                
                
                <button onClick={onClose} className="link-voltar">Cancelar</button>


            </div>
        </div>
    );
}

export default Cadastro;