import { useState } from 'react';

// O componente recebe as "props" (dados e funções) da página principal
function TarefaItem({ tarefa, onAlternarStatus, onExcluir, onSalvarEdicao }) {
    // Agora cada item tem a sua própria memória de edição!
    const [emEdicao, setEmEdicao] = useState(false);
    const [textoLocal, setTextoLocal] = useState(tarefa.title);

    const handleSalvar = () => {
        onSalvarEdicao(tarefa, textoLocal); // Avisa o pai que queremos salvar
        setEmEdicao(false); // Sai do modo de edição
    };

    const handleCancelar = () => {
        setTextoLocal(tarefa.title); // Volta ao texto original
        setEmEdicao(false);
    };

    return (
        <li className="item-tarefa">
            {emEdicao ? (
                // MODO DE EDIÇÃO
                <div className="container-edicao">
                    <input 
                        type="text" 
                        value={textoLocal} 
                        onChange={(e) => setTextoLocal(e.target.value)} 
                        className="input-edicao"
                        autoFocus
                    />
                    <button onClick={handleSalvar} className="btn-salvar">Salvar</button>
                    <button onClick={handleCancelar} className="btn-cancelar">Cancelar</button>
                </div>
            ) : (
                // MODO DE VISUALIZAÇÃO
                <>
                    <span 
                        onClick={() => onAlternarStatus(tarefa)}
                        className={`texto-tarefa ${tarefa.isCompleted ? 'tarefa-concluida' : ''}`}
                        title="Clique para marcar como concluída ou pendente"
                    >
                        {tarefa.title} 
                    </span>
                    
                    <div className="acoes-tarefa">
                        <button onClick={() => setEmEdicao(true)} className="btn-editar">
                            Editar
                        </button>
                        <button onClick={() => onExcluir(tarefa.id)} className="btn-excluir">
                            Excluir
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TarefaItem;