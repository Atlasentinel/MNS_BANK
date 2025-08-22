namespace ms_login.Models
{
    public class RegisterRequest
    {
        public string? Name { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }

        public string? Token { get; set; }
    }
}
