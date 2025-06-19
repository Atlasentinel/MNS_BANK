using Microsoft.AspNetCore.Mvc;
using ms_login.Models;
using ms_login.Services;

namespace ms_login.Controllers
{

        [ApiController]
        [Route("api/[controller]")]
        public class CheckController : ControllerBase
        {
            private readonly Services.AuthService _authService = new();

            [HttpPost("token")]
            public IActionResult Login([FromBody] LoginRequest request)
            {
                var token = _authService.Authenticate(request);
                if (token == null)
                    return Ok(new LoginResponse { IsTokenExist = false });

                return Ok(new LoginResponse { IsTokenExist = true });
            }
        }
}
