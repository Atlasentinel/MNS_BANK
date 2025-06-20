using Microsoft.VisualStudio.TestTools.UnitTesting;
using ms_login.Models;
using ms_login.Services;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using System;

namespace ms_login_test
{
    [TestClass]
    public class AuthServiceTests
    {
        private string? TestDbPath;

        [TestInitialize]
        public void Setup()
        {
            // Récupère le fichier dans le bon chemin d'accès
            TestDbPath = Path.Combine(AppContext.BaseDirectory, "db.json");

            var testUsers = new UsersData
            {
                Users = new List<User>
                {
                    new User
                    {
                        Login = "user1@mail.com",
                        Password = ms_login.Helper.HashHelper.ComputeSha512Hash("pass1"),
                        Token = null
                    }
                }
            };

            var options = new JsonSerializerOptions { WriteIndented = true };
            File.WriteAllText(TestDbPath, JsonSerializer.Serialize(testUsers, options));
        }

        [TestMethod]
        public void Authenticate_ValidCredentials_ReturnsToken()
        {
            var service = new AuthServiceTestable(TestDbPath);
            var request = new LoginRequest
            {
                Login = "user1@mail.com",
                Password = "pass1"
            };

            var result = service.Authenticate(request);
            Console.WriteLine("Returned token: " + result);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Authenticate_InvalidPassword_ReturnsNull()
        {
            var service = new AuthServiceTestable(TestDbPath);
            var request = new LoginRequest
            {
                Login = "user1@mail.com",
                Password = "wrongpassword"
            };

            var result = service.Authenticate(request);
            Assert.IsNull(result);
        }
    }

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
}
