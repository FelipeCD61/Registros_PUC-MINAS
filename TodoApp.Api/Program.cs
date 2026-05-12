using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Api.Data;
using TodoApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Adiciona suporte aos Controllers
builder.Services.AddControllers();

// 2. Configura o Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. Configura o Banco de Dados SQLite
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=todo.db"));

// 4. Registra o nosso serviço de Autenticação
builder.Services.AddScoped<AuthService>();

// 5. Configura o JWT (Como o token é gerado e validado)
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? "SuaChaveSuperSecretaEMuitoLonga123!");
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false; // Permite testar localmente sem HTTPS
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Adiciona Autorização
builder.Services.AddAuthorization();

var app = builder.Build();

// Configura a Pipeline (o caminho da requisição HTTP)
if (app.Environment.IsDevelopment())
{
    // Ativa a página visual do Swagger
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Ligar Autenticação e Autorização ANTES de mapear os controllers
app.UseAuthentication();
app.UseAuthorization();

// Liga as rotas (Controllers)
app.MapControllers();

app.Run();