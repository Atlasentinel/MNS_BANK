using System.Text.Json.Serialization;

namespace ms_login.Models
{
    public class LoginResponse
    {
        [JsonPropertyName("token")]
        public bool IsTokenExist { get; set; }
    }
}
