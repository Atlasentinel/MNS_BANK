using System.Text.Json.Serialization;

namespace ms_login.Models
{
    public class ClientsData
    {
        [JsonPropertyName("clients")]
        public List<Client>? Clients { get; set; }
    }
}
