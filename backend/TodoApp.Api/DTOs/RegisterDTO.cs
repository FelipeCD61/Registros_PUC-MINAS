using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.DTOs
{
    // Esta classe define exatamente o que o Frontend deve enviar no cadastro
    public class RegisterDto
    {
        [Required(ErrorMessage = "O nome de utilizador é obrigatório.")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "O nome de utilizador deve ter entre 3 e 20 caracteres.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
        public string Password { get; set; } = string.Empty;
    }
}