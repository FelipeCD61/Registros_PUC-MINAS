using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.DTOs
{
    // Este objeto recebe apenas o que interessa do utilizador
    public class TaskDto
    {
        [Required(ErrorMessage = "O título da tarefa é obrigatório.")]
        [MinLength(3, ErrorMessage = "O título deve ter pelo menos 3 caracteres.")]
        [MaxLength(100, ErrorMessage = "O título não pode exceder 100 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "A descrição não pode exceder 500 caracteres.")]
        public string? Description { get; set; }

        public bool IsCompleted { get; set; }
    }
}