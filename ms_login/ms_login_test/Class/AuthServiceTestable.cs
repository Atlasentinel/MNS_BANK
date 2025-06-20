// Classe de test qui instancie AuthService avec une BDD mock
using ms_login.Models;
using ms_login.Services;
using System.Text.Json;

public class AuthServiceTestable : AuthService
{
    public AuthServiceTestable(string path)
    {
        var json = File.ReadAllText(path);
        var data = JsonSerializer.Deserialize<UsersData>(json);
        var users = data?.Users ?? new List<User>();

        typeof(AuthService)
            .GetField("_users", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
            ?.SetValue(this, users);

        typeof(AuthService)
            .GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
            ?.SetValue(this, Path.GetFullPath(path));
    }
}