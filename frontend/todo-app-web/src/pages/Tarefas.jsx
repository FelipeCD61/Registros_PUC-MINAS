import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/tarefas.css';

function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    
    // NOVAS VARIÁVEIS DE ESTADO PARA A EDIÇÃO
    const [idTarefaEmEdicao, setIdTarefaEmEdicao] = useState(null);
    const [textoEditado, setTextoEditado] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        carregarTarefas(token);
    }, []);

    const carregarTarefas = async (token) => {
        try {
            const response = await api.get('/TodoTask', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTarefas(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    const handleAdicionar = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await api.post('/TodoTask', 
                { title: novaTarefa, isCompleted: false }, 
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            setNovaTarefa(''); 
            carregarTarefas(token); 
        } catch (error) {
            console.error("Erro ao adicionar tarefa", error);
        }
    };

    const handleAlternarStatus = async (tarefa) => {
        const token = localStorage.getItem('token');
        try {
            await api.put(`/TodoTask/${tarefa.id}`,
                { ...tarefa, isCompleted: !tarefa.isCompleted },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            carregarTarefas(token); 
        } catch (error) {
            console.error("Erro ao atualizar status", error);
        }
    };

    const handleExcluir = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/TodoTask/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            carregarTarefas(token); 
        } catch (error) {
            console.error("Erro ao excluir tarefa", error);
        }
    };

    // NOVA FUNÇÃO: Ativa o modo de edição para uma tarefa específica
    const iniciarEdicao = (tarefa) => {
        setIdTarefaEmEdicao(tarefa.id);
        setTextoEditado(tarefa.title); // Preenche a caixa de texto com o título atual
    };

    // NOVA FUNÇÃO: Cancela a edição
    const cancelarEdicao = () => {
        setIdTarefaEmEdicao(null);
        setTextoEditado('');
    };

    // NOVA FUNÇÃO: Envia o texto modificado para o C#
    const handleSalvarEdicao = async (tarefa) => {
        const token = localStorage.getItem('token');
        try {
            await api.put(`/TodoTask/${tarefa.id}`,
                // Mantemos o id e o status, mas mudamos o title para o texto novo
                { ...tarefa, title: textoEditado },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Depois de salvar, saímos do modo de edição e recarregamos a lista
            setIdTarefaEmEdicao(null);
            carregarTarefas(token); 
        } catch (error) {
            console.error("Erro ao salvar edição", error);
        }
    };

    const handleSair = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container-tarefas">
            <div className="cabecalho-tarefas">
                <h2>Minhas Tarefas</h2>
                <button onClick={handleSair} className="btn-sair">Sair</button>
            </div>

            <form onSubmit={handleAdicionar} className="form-tarefas">
                <input
                    type="text"
                    placeholder="O que precisas de fazer?"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    required
                    className="input-nova-tarefa"
                />
                <button type="submit" className="btn-adicionar">Adicionar</button>
            </form>

            <ul className="lista-tarefas">
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="item-tarefa">
                        
                        
                        {idTarefaEmEdicao === tarefa.id ? (
                            
                            // se sim: Mostra o campo de edição e os botões Salvar/Cancelar
                            <div className="container-edicao">
                                <input 
                                    type="text" 
                                    value={textoEditado} 
                                    onChange={(e) => setTextoEditado(e.target.value)} 
                                    className="input-edicao"
                                    autoFocus // Coloca o cursor a piscar automaticamente aqui
                                />
                                <button onClick={() => handleSalvarEdicao(tarefa)} className="btn-salvar">Salvar</button>
                                <button onClick={cancelarEdicao} className="btn-cancelar">Cancelar</button>
                            </div>

                        ) : (
                            
                            // se não: Mostra o texto normal, botão Editar e botão Excluir
                            <>
                                <span 
                                    onClick={() => handleAlternarStatus(tarefa)}
                                    className={`texto-tarefa ${tarefa.isCompleted ? 'tarefa-concluida' : ''}`}
                                    title="Clique para marcar como concluída ou pendente"
                                >
                                    {tarefa.title} 
                                </span>
                                
                                <div className="acoes-tarefa">
                                    <button onClick={() => iniciarEdicao(tarefa)} className="btn-editar">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluir(tarefa.id)} className="btn-excluir">
                                        Excluir
                                    </button>
                                </div>
                            </>

                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tarefas;