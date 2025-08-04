using Microsoft.AspNetCore.Mvc;
using ms_login.Models;
using ms_login.Services;
using System.Threading.Tasks;
using ms_login.Services.AuthService;

namespace ms_login.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(AuthService authService) : ControllerBase
    {
        private readonly AuthService _authService = authService;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Ecrire dans la console salut
            Console.WriteLine($"🔐 Tentative d'authentification : {request.Login}");
            var token = await _authService.Authenticate(request); // <- ATTEND LA TASK

            if (token == null)
                return Unauthorized();

            return Ok(token);
        }
    }
}
