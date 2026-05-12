namespace TodoApp.Api.DTOs
{
    // Este objeto recebe apenas o que interessa do utilizador
    public class TaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
    }
}