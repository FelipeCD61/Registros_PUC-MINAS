using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoApp.Api.Data;
using TodoApp.Api.DTOs;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [Authorize] // <-- O CADEADO: Exige que um Token válido seja enviado
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoTaskController(AppDbContext context)
        {
            _context = context;
        }

        // MÉTODO AUXILIAR: Extrair ID do Token
        private int GetUserId()
        {
            // O .NET lê o Token e extrai o "NameIdentifier" que configurámos no Login
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        // READ: Listar as Tarefas do Utilizador
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks()
        {
            int userId = GetUserId(); // Descobre quem é o utilizador

            // Vai ao banco e procura APENAS as tarefas que pertencem a este utilizador
            var tasks = await _context.Tasks
                                      .Where(t => t.UserId == userId)
                                      .ToListAsync();
            return Ok(tasks);
        }

        // CREATE: Criar uma Nova Tarefa
        [HttpPost]
        public async Task<ActionResult<TodoTask>> CreateTask(TaskDto request)
        {
            int userId = GetUserId();

            // Monta a tarefa ligando-a ao ID do utilizador logado
            var newTask = new TodoTask
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted,
                UserId = userId 
            };

            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return Ok(newTask);
        }

        // UPDATE: Editar uma Tarefa Existente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskDto request)
        {
            int userId = GetUserId();

            // Procura a tarefa pelo ID da tarefa E pelo ID do utilizador (Segurança dupla)
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null)
            {
                return NotFound("Tarefa não encontrada ou não pertence a este utilizador.");
            }

            // Atualiza os dados
            task.Title = request.Title;
            task.Description = request.Description;
            task.IsCompleted = request.IsCompleted;

            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // DELETE: Apagar uma Tarefa
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            int userId = GetUserId();

            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null)
            {
                return NotFound("Tarefa não encontrada ou não pertence a este utilizador.");
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Tarefa apagada com sucesso!" });
        }
    }
}