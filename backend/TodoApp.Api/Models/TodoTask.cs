using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.Models
{
    public class TodoTask
    {
        public int Id { get; set; }

        // Validações para o título da tarefa
        [Required(ErrorMessage = "O título da tarefa é obrigatório.")]
        [MinLength(3, ErrorMessage = "O título deve ter pelo menos 3 caracteres.")]
        [MaxLength(100, ErrorMessage = "O título não pode exceder 100 caracteres.")]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // Relacionamento: Toda tarefa pertence a um usuário (exigência do CRUD com Auth)
        public int UserId { get; set; }
    }
}