//Initialisation du builder pour cr�er la webApp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

//Instantiation de l'app et d�marrage de la webApp
app.UseHttpsRedirection();
app.UseAuthentication();
app.MapControllers();

app.Run();