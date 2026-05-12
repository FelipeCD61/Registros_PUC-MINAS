using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Cria uma tabela chamada Tasks baseada na classe User"
        public DbSet<TodoTask> Tasks { get; set; }
        // Cria uma tabela chamada Users baseada na classe User"
        public DbSet<User> Users { get; set; }
    }
}