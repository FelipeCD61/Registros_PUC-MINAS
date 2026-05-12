namespace TodoApp.Api.DTOs
{
    // Objeto usado apenas para receber dados de Login e Registro
    public class UserDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}