using System.Text.Json.Serialization;

namespace ms_login.Models
{
    public class TokenRequest
    {
        [JsonPropertyName("token")]
        public string? Token { get; set; }
        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
