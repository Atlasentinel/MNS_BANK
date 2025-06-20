using System.Text.Json.Serialization;

namespace ms_login.Models
{
    public class UsersData
    {
        [JsonPropertyName("users")]
        public List<User>? Users { get; set; }
    }
}
