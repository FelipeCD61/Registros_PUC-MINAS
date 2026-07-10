# Todo App - Sistema de Gestão de Tarefas

## Descrição do Projeto
Este projeto é uma aplicação web completa (Fullstack) para gestão de tarefas (Todo App). O sistema permite que os utilizadores criem contas, façam login de forma segura e giram as suas tarefas diárias (Criar, Ler, Atualizar, Excluir). Cada utilizador tem acesso exclusivo apenas às suas próprias tarefas.

## Tecnologias Utilizadas

**Backend (API Rest):**
* C# .NET Core
* Entity Framework Core (ORM)
* Banco de Dados SQLite (Leve e embutido)
* Autenticação com JWT (JSON Web Token)
* BCrypt para encriptação (Hash) de senhas

**Frontend (Interface Web):**
* React JS (criado com Vite)
* React Router DOM (para navegação entre páginas)
* Axios (para requisições HTTP)
* CSS puro organizado na pasta `assets`

## Instruções para Execução do Backend

Para rodar a API localmente, precisa ter o [.NET 10 SDK](https://dotnet.microsoft.com/) instalado no teu computador.

1. Abre o teu terminal.
2. Navega até à pasta do backend:
   ```bash
   cd backend/TodoApp.Api
   dotnet run

3. A API estará disponível (ex: `http://localhost:5218`). O Swagger pode ser acessado adicionando `/swagger` ao URL para testar os endpoints diretamente no navegador.

## Instruções para Execução do Frontend

Para rodar a interface de utilizador, é necessário ter o [Node.js](https://nodejs.org/) instalado.

1. Abre um novo terminal e navega até à pasta do frontend:
   ```bash
   cd frontend/todo-app-web
   npm install
   npm run dev

2. Acesse à aplicação através do link gerado no terminal (ex: `http://localhost:5173`).

## Estrutura do projeto

raiz-do-projeto/
├── backend/
│   └── TodoApp.Api/
│       ├── Controllers/      # Lógica de entrada das requisições (Auth, TodoTask)
│       ├── Services/         # Regras de negócio e lógica complexa (ex: AuthService para JWT)
│       ├── Models/           # Entidades que representam as tabelas no banco de dados
│       ├── DTOs/             # Objetos de transferência de dados (segurança de tráfego)
│       ├── Data/             # Contexto do Entity Framework e configuração do SQLite
│       └── Program.cs        # Configurações de inicialização, CORS e Autenticação JWT
│
└── frontend/
    └── todo-app-web/
        ├── src/
        │   ├── assets/       # Ficheiros CSS padronizados e isolados
        │   ├── components/   # Componentes React reutilizáveis (ex: TarefaItem.jsx)
        │   ├── pages/        # Ecrãs principais da aplicação (Login.jsx, Tarefas.jsx)
        │   ├── services/     # Configuração do Axios (api.js) para chamadas ao backend
        │   └── App.jsx       # Ponto de entrada e configuração do roteamento


## Explicação das decisões arquiteturais adotadas:

1. **Arquitetura Desacoplada (Client-Server):** O projeto foi dividido em duas aplicações independentes. O backend atua estritamente como uma API de dados e o frontend foca-se na experiência de utilizador. Isto facilita a manutenção e permite que a mesma API seja usada por aplicações mobile no futuro.

2. **Autenticação Stateless com JWT:** Adotou-se o uso de JSON Web Tokens em vez de sessões baseadas em cookies. O token é gerado no login, armazenado no localStorage do frontend e enviado via cabeçalho (Authorization) em cada requisição privada. Isto torna a API mais leve e escalável.

3. **Componentização no React:** O frontend segue o princípio de componentes reutilizáveis. Elementos visuais e lógicos complexos estão na pasta components/, mantendo as páginas limpas e com as responsabilidades bem divididas.

4. **CSS Centralizado:** Estilização em uma pasta dedicada (assets). Isto garante um padrão de design visual consistente e código HTML/JSX mais limpo.

5. **Banco de Dados SQLite:** Escolhido por não necessitar de instalações pesadas de infraestrutura. O banco de dados é gerado localmente na pasta do projeto, o que é ideal para ambientes de desenvolvimento e testes rápidos.