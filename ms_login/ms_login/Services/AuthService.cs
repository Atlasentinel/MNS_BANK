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
        private readonly List<User> _users;
        private readonly string _jsonPath;

        public AuthService()
        {
            _jsonPath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Bdd", "db.json"));
            Console.WriteLine($"📁 Chargement des utilisateurs depuis : {_jsonPath}");

            _users = LoadUsersFromJson();
        }

        public string Authenticate(LoginRequest request)
        {
            var hashedPassword = HashHelper.ComputeSha512Hash(request.Password);
            Console.WriteLine($"🔐 Tentative d'authentification : {request.Login} / Hash: {hashedPassword}");

            var user = _users.FirstOrDefault(u =>
                u.Login.Trim().Equals(request.Login.Trim(), StringComparison.OrdinalIgnoreCase) &&
                u.Password == hashedPassword);

            if (user == null)
            {
                Console.WriteLine("❌ Authentification échouée.");
                return null;
            }

            if (string.IsNullOrEmpty(user.Token))
            {
                user.Token = Guid.NewGuid().ToString();
                Console.WriteLine("🪪 Nouveau token généré.");
                SaveUsersToJson(_users);
            }

            Console.WriteLine($"✅ Authentification réussie pour : {user.Login}");
            return user.Token;
        }

        public bool CheckToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                Console.WriteLine("❌ Token vide ou nul.");
                return false;
            }

            var user = _users.FirstOrDefault(u => u.Token == token);
            var isValid = user != null;

            Console.WriteLine(isValid
                ? $"✅ Token valide pour : {user.Login}"
                : "❌ Token invalide.");

            return isValid;
        }

        private List<User> LoadUsersFromJson()
        {
            try
            {
                if (!File.Exists(_jsonPath))
                {
                    Console.WriteLine("⚠️ Fichier JSON introuvable. Création d'un nouveau.");
                    SaveUsersToJson(new List<User>());
                    return new List<User>();
                }

                var json = File.ReadAllText(_jsonPath);
                var data = JsonSerializer.Deserialize<UsersData>(json);
                var users = data?.Users ?? new List<User>();

                Console.WriteLine($"👥 Utilisateurs chargés : {users.Count}");
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception($"❌ Erreur lors du chargement des utilisateurs : {ex.Message}");
            }
        }

        private void SaveUsersToJson(List<User> users)
        {
            try
            {
                var directory = Path.GetDirectoryName(_jsonPath);
                if (!Directory.Exists(directory))
                    Directory.CreateDirectory(directory);

                var json = JsonSerializer.Serialize(new UsersData { Users = users }, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_jsonPath, json);

                Console.WriteLine("✅ Données utilisateurs sauvegardées avec succès.");
            }
            catch (Exception ex)
            {
                throw new Exception($"❌ Erreur lors de la sauvegarde : {ex.Message}\n{ex.StackTrace}");
            }
        }
    }
}
