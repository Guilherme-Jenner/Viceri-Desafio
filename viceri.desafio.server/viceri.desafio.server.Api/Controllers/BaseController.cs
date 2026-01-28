using Microsoft.AspNetCore.Mvc;

namespace viceri.desafio.server.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly ILogger _logger;

        public BaseController(ILogger logger)
        {
            _logger = logger;
        }

        [NonAction]
        public IActionResult ReturnResponse(object data = null)
        {
            return Ok(new {success = true, data });
        }
    }
}
