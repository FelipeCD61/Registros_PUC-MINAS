namespace TodoApp.Api.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        // Relacionamento: Toda tarefa pertence a um usuário (exigência do CRUD com Auth)
        public int UserId { get; set; }
    }
}