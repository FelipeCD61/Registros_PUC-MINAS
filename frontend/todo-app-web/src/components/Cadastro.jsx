import { useState } from 'react';
import api from '../services/api';
import '../assets/cadastro.css';

function Cadastro({ onClose }) { // Recebe a função para fechar o pop-up
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    const handleCadastro = async (e) => {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });

        try {
            await api.post('/Auth/register', { username, password });
            setMensagem({ tipo: 'sucesso', texto: 'Conta criada! A fechar...' });
            
            // Fecha o pop-up automaticamente após 1.5s
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setMensagem({ tipo: 'erro', texto: 'Erro ao criar conta.' });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="titulo-cadastro">Criar Conta</h2>
                
                {mensagem.texto && (
                    <div className={mensagem.tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro'}>
                        {mensagem.texto}
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