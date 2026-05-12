namespace TodoApp.Api.Models
{
    // Esta classe representa a tabela de Utilizadores no teu banco de dados SQLite
    public class User
    {
        // O ID é a Chave Primária (PK), o .NET entende isso automaticamente pelo nome
        public int Id { get; set; }

        // O nome de utilizador que será usado no Login
        public string Username { get; set; } = string.Empty;
        
        // Aqui guardamos o Hash da senha (gerado pelo BCrypt) por segurança
        public string PasswordHash { get; set; } = string.Empty;
    }
}