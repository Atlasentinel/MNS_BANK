using Microsoft.AspNetCore.Mvc;
using ms_login.Models;
using ms_login.Services;

namespace ms_login.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly Services.AuthService _authService = new();
        
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var token = _authService.Authenticate(request);
            if(token == null)
                return Unauthorized(new { error = "Invalid credentials" });

            return Ok(new { token });
        }

    }
}
