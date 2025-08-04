using ms_login.Services.AuthService;

//Initialisation du builder pour cr�er la webApp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();                // Pour HttpClientFactory
builder.Services.AddScoped<AuthService>();    
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

//Instantiation de l'app et d�marrage de la webApp
app.UseHttpsRedirection();
app.UseAuthentication();
app.MapControllers();

app.Run("http://0.0.0.0:3001");