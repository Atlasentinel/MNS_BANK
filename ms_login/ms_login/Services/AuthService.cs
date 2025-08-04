using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using ms_login.Models;
using ms_login.Helper;

namespace ms_login.Services
{
    public class AuthService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public AuthService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string?> Authenticate(LoginRequest request)
        {
            var hashedPassword = HashHelper.ComputeSha512Hash(request.Password ?? "");
            Console.WriteLine($"🔐 Tentative d'authentification : {request.Login} / Hash: {hashedPassword}");

            var httpClient = _httpClientFactory.CreateClient();
            var url = $"http://ms-dao/clients/login";

            var payload = new
            {
                login = request.Login,
                password = hashedPassword
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("❌ Authentification échouée : DAO n’a pas trouvé le client.");
                return null;
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var client = JsonSerializer.Deserialize<Client>(jsonResponse);

            if (client == null)
            {
                Console.WriteLine("❌ DAO a retourné un client null.");
                return null;
            }

            if (string.IsNullOrEmpty(client.Token))
            {
                client.Token = Guid.NewGuid().ToString();
                Console.WriteLine("🪪 Nouveau token généré.");

                await SaveClient(client);
            }

            Console.WriteLine($"✅ Authentification réussie pour : {client.Login}");
            return client.Token;
        }

        public async Task<bool> CheckToken(string? token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                Console.WriteLine("❌ Token vide ou nul.");
                return false;
            }

            var httpClient = _httpClientFactory.CreateClient();
            var url = $"http://ms-dao/clients/token/{token}";

            try
            {
                var response = await httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode) return false;

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var client = JsonSerializer.Deserialize<Client>(jsonResponse);

                if (client == null) return false;

                Console.WriteLine($"✅ Token valide pour : {client.Login}");
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine($"❌ Erreur lors de la vérification du token : {e.Message}");
                return false;
            }
        }

        private async Task SaveClient(Client client)
        {
            var httpClient = _httpClientFactory.CreateClient();
            try
            {
                string url = "http://ms-dao/client/create";
                HttpResponseMessage response = await httpClient.PostAsJsonAsync(url, client);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Réponse ms-dao : {responseBody}");
                Console.WriteLine("Données utilisateur sauvegardées via API.");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Erreur HTTP (ms-dao) : {e.Message}");
            }
        }
    }
}
