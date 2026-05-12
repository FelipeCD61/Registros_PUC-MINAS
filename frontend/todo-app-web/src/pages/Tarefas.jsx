import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TarefaItem from '../components/TarefaItem';
import '../assets/tarefas.css';

function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
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

    const handleSalvarEdicao = async (tarefa, novoTitulo) => {
        const token = localStorage.getItem('token');
        try {
            await api.put(`/TodoTask/${tarefa.id}`,
                { ...tarefa, title: novoTitulo },
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
                    // Aqui usamos o nosso componente reutilizável e passamos as props!
                    <TarefaItem 
                        key={tarefa.id} 
                        tarefa={tarefa} 
                        onAlternarStatus={handleAlternarStatus}
                        onExcluir={handleExcluir}
                        onSalvarEdicao={handleSalvarEdicao}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Tarefas;