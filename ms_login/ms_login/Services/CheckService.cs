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
    public class CheckService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CheckService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<bool> CheckToken(string? token, int? id)
        {
            if (string.IsNullOrWhiteSpace(token) || id == null)
            {
                Console.WriteLine("Token ou ID vide ou nul.");
                return false;
            }

            var httpClient = _httpClientFactory.CreateClient();
            var url = $"http://ms-dao:3200/client/{id}";

            try
            {
                var response = await httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Utilisateur avec ID {id} introuvable dans ms-dao.");
                    return false;
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var client = JsonSerializer.Deserialize<Client>(jsonResponse, options);

                if (client == null)
                {
                    Console.WriteLine("Réponse de ms-dao invalide : client null.");
                    return false;
                }

                if (string.IsNullOrWhiteSpace(client.Token))
                {
                    Console.WriteLine($"Aucun token enregistré pour l'utilisateur ID {id}.");
                    return false;
                }

                if (client.Token != token)
                {
                    Console.WriteLine($"Token incorrect pour l'utilisateur ID {id}.");
                    return false;
                }

                Console.WriteLine($"Token valide pour l'utilisateur {client.Login} (ID {id}).");
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erreur lors de la vérification du token pour ID {id} : {e.Message}");
                return false;
            }
        }
    }
}