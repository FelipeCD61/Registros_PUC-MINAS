using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Api.Data;
using TodoApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte aos Controllers
builder.Services.AddControllers();

// Configura o Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();

// Nova configuração do Swagger para aceitar o Token JWT
builder.Services.AddSwaggerGen(c =>
{
    // Define como o botão Authorize vai funcionar
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Insira o token JWT gerado no Login."
    });

    // Aplica a segurança a todos os endpoints que testarmos
    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configura o Banco de Dados SQLite
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=todo.db"));

// Registra o nosso serviço de Autenticação
builder.Services.AddScoped<AuthService>();

// Configura o JWT (Como o token é gerado e validado)
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