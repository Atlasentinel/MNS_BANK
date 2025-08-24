using Microsoft.AspNetCore.Mvc;
using ms_login.Models;
using ms_login.Services;
using System.Threading.Tasks;

namespace ms_login.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(AuthService authService) : ControllerBase
    {
        private readonly AuthService _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            Console.WriteLine($"🔐 Tentative de création de compte : {request.Login}");
            var token = await _authService.SaveClient(request); 

            if (token == null)
                return Unauthorized();

            return Ok(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            Console.WriteLine($"🔐 Tentative d'authentification : {request.Login}");
            var token = await _authService.Authenticate(request);

            if (token == null)
                return Unauthorized();

            return Ok(token);
        }
    }
}
