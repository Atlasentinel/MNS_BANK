using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using ms_login.Models;
using ms_login.Helper;

namespace ms_login.Services
{
    public class AuthService
    {
        private List<User> _users;
        private string _jsonPath;

        public AuthService()
        {
            _jsonPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Bdd", "db.json");
            _jsonPath = Path.GetFullPath(_jsonPath);
            Console.WriteLine($"Loading users from: {_jsonPath}");

            _users = new List<User>();

            try
            {
                if (!File.Exists(_jsonPath))
                {
                    Console.WriteLine("File not found. Creating a new one.");
                    SaveUsersToJson(); // Créer le fichier s'il n'existe pas
                    return;
                }

                var json = File.ReadAllText(_jsonPath);
                var data = JsonSerializer.Deserialize<UsersData>(json);

                if (data?.Users != null)
                {
                    _users = data.Users;
                    Console.WriteLine($"Loaded {_users.Count} users.");
                }
                else
                {
                    Console.WriteLine("No users found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to load users: {ex.Message}");
            }
        }

        public string Authenticate(LoginRequest request)
        {
            string hashedPassword = HashHelper.ComputeSha512Hash(request.Password);
            Console.WriteLine(request.Password + " Mdp: " + " Hashed: " + hashedPassword);

            var user = _users.FirstOrDefault(u =>
                u.Login.Trim().Equals(request.Login.Trim(), StringComparison.OrdinalIgnoreCase) &&
                u.Password == hashedPassword);

            if (user == null)
            {
                Console.WriteLine("Authentication failed.");
                return null;
            }

            // Génère un token s'il n'existe pas
            if (string.IsNullOrEmpty(user.Token))
            {
                user.Token = Guid.NewGuid().ToString();
                Console.WriteLine("Creating user token");
                SaveUsersToJson(); // Sauvegarde les données utilisateurs
            }

            Console.WriteLine($"Authentication successful: {user.Login}, token: {user.Token}");
            return user.Token;
        }

        public bool CheckToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                Console.WriteLine("❌ Token is null or empty.");
                return false;
            }

            var user = _users.FirstOrDefault(u => u.Token == token);

            if (user != null)
            {
                Console.WriteLine($"✅ Token valid for user: {user.Login}");
                return true;
            }

            Console.WriteLine("❌ Invalid token.");
            return false;
        }


        private void SaveUsersToJson()
        {
            try
            {
                Console.WriteLine($"File path: {_jsonPath}");

                var directory = Path.GetDirectoryName(_jsonPath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                    Console.WriteLine($"Directory created: {directory}");
                }

                var data = new UsersData { Users = _users };
                var options = new JsonSerializerOptions { WriteIndented = true };
                string jsonString = JsonSerializer.Serialize(data, options);

                Console.WriteLine($"Data to save: {jsonString}");

                File.WriteAllText(_jsonPath, jsonString);
                Console.WriteLine("✅ Token saved to file db.json!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error saving JSON: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            }
        }
    }
}
