using Microsoft.AspNetCore.Mvc;
using ms_login.Models;
using ms_login.Services;

namespace ms_login.Controllers
{

        [ApiController]
        [Route("api/[controller]")]
        public class CheckController : ControllerBase
        {
            private readonly AuthService _authService = new();

            [HttpPost("token")]
            public IActionResult Login([FromBody] TokenRequest request)
            {
                bool tokenExists = _authService.CheckToken(request.Token);
                if (!tokenExists || tokenExists == null)
                    return Ok(new LoginResponse { IsTokenExist = tokenExists });

                return Ok(new LoginResponse { IsTokenExist = tokenExists });
            }
    }
}
