using Microsoft.AspNetCore.Mvc;
using ms_login.Services;
using ms_login.Models;
using System.Threading.Tasks;

namespace ms_login.Controllers
{
    [ApiController]
    [Route("check")]
    public class CheckController : ControllerBase
    {
        private readonly CheckService _checkService;

        public CheckController(CheckService checkService)
        {
            _checkService = checkService;
        }

        [HttpPost("token")]
        public async Task<IActionResult> CheckToken([FromBody] TokenRequest request)
        {
            bool isValid = await _checkService.CheckToken(request.Token, request.Id);
            return Ok(isValid);
        }
    }
}
