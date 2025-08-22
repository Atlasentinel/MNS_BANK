using ms_login.Services;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddScoped<AuthService>();    
builder.Services.AddScoped<CheckService>();    
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Bienvenue sur l'API MNS_BANK !");

app.MapControllers();

Console.WriteLine("Application prête à démarrer sur http://localhost:3001");

try
{
    app.Run("http://0.0.0.0:3001");
}
catch (Exception ex)
{
    Console.WriteLine($"Erreur au démarrage : {ex.Message}");
    throw;
}