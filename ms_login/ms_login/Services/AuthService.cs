using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using ms_login.Models;

namespace ms_login.Services
{
    public class AuthService
    {
        private List<User> _users;

        public AuthService()
        {
            _users = new List<User>();

            try
            {
                // Cherche le chemin d'accès du fichier de la bdd
                var jsonPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Bdd", "db.json");

                jsonPath = Path.GetFullPath(jsonPath);

                Console.WriteLine($"Attempting to load file from: {jsonPath}");

                if (!File.Exists(jsonPath))
                {
                    Console.WriteLine("File not found.");
                    return;
                }

                var json = File.ReadAllText(jsonPath);
                Console.WriteLine("File content: " + json);

                // Formate le json pour pouvoir le lire
                var data = JsonSerializer.Deserialize<UsersData>(json)!;

                if (data != null && data.Users != null && data.Users.Count > 0)
                {
                    Console.WriteLine($"Number of users loaded: {data.Users.Count}");
                    _users = data.Users;
                }
                else
                {
                    Console.WriteLine("Error: No users loaded or invalid data!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading users: {ex.Message}");
            }
        }

        public string Authenticate(LoginRequest request)
        {
            // Cherche le login et compare les identifiants
            var user = _users.FirstOrDefault(u =>
                u.Login.Trim().Equals(request.Login.Trim(), StringComparison.OrdinalIgnoreCase) &&
                u.Password.Trim() == request.Password.Trim());

            if (user == null)
            {
                Console.WriteLine("Authentication failed: User not found.");
                return null;
            }
            else
            {
                Console.WriteLine($"Authentication successful, token: {user.Token}");
                return user.Token;
            }
        }
    }
}
