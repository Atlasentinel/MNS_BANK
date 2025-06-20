using System.Text.Json.Serialization;

namespace ms_login.Models
{
    public class User
    {
        [JsonPropertyName("login")]
        public string Login { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("token")]
        public string Token { get; set; }
    }
}
