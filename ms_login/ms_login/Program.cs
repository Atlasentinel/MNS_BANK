//Initialisation du builder pour créer la webApp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

//Instantiation de l'app et démarrage de la webApp
app.UseHttpsRedirection();
app.UseAuthentication();
app.MapControllers();

app.Run();