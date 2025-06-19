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
                    Console.WriteLine("File not found.");
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
                u.Login.Trim().Equals(request.Login.Trim(), StringComparison.OrdinalIgnoreCase)
                && u.Password == hashedPassword);

            if (user == null)
            {
                Console.WriteLine("Authentication failed.");
                return null;
            }

            // Génère un token s'il n'y en a pas déjà un
            if (string.IsNullOrEmpty(user.Token))
            {
                user.Token = Guid.NewGuid().ToString();
                Console.WriteLine("Création du token de l'utilisateur");
                SaveUsersToJson();
            }

            Console.WriteLine($"Authentication successful: {user.Login}, token: {user.Token}");
            return user.Token;
        }

        private void SaveUsersToJson()
        {
            try
            {
                // Vérifiez que le chemin est correct
                Console.WriteLine($"Chemin du fichier : {_jsonPath}");

                // Vérifiez que le répertoire existe, sinon créez-le
                var directory = Path.GetDirectoryName(_jsonPath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                    Console.WriteLine($"Répertoire créé : {directory}");
                }

                // Initialisez les données
                var data = new UsersData { Users = _users };
                Console.WriteLine($"Données à sauvegarder : {JsonSerializer.Serialize(data)}");

                // Options de sérialisation
                var options = new JsonSerializerOptions { WriteIndented = true };

                // Écrivez le fichier
                File.WriteAllText(_jsonPath, JsonSerializer.Serialize(data, options));
                Console.WriteLine("✅ Token sauvegardé dans le fichier db.json !");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Erreur lors de la sauvegarde JSON : {ex.Message}");
                Console.WriteLine($"Stack Trace : {ex.StackTrace}");
            }
        }
    }
}
