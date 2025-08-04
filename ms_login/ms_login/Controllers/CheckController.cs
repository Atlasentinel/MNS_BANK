using Microsoft.AspNetCore.Mvc;
using ms_login.Services;
using System.Threading.Tasks;

namespace ms_login.Controllers
{
    [ApiController]
    [Route("check")]
    public class CheckController : ControllerBase
    {
        private readonly AuthService _authService;

        public CheckController(AuthService authService) // <- CORRECT maintenant
        {
            _authService = authService;
        }

        [HttpGet("token")]
        public async Task<IActionResult> CheckToken([FromQuery] string token)
        {
            bool isValid = await _authService.CheckToken(token); // <- ATTEND LA TASK
            return Ok(isValid);
        }
    }
}
