using Microsoft.AspNetCore.Mvc;
using viceri.desafio.server.Application.DTO;
using viceri.desafio.server.Application.Interfaces;

namespace viceri.desafio.server.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class HeroiController : BaseController
    {
        private readonly ILogger<HeroiController> _logger;
        private readonly IHeroiService _heroiService;

        public HeroiController(ILogger<HeroiController> logger, IHeroiService heroiService) : base(logger)
        {
            _heroiService = heroiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHerois()
        {
            var herois = await _heroiService.GetAllHerois();

            return ReturnResponse(herois);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPoderes()
        {
            var herois = await _heroiService.GetAllPoderes();

            return ReturnResponse(herois);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHeroiById(int id)
        {
            try
            {
                var heroi = await _heroiService.GetHeroiById(id);
                return ReturnResponse(heroi);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateHeroi([FromBody] HeroiDto heroiDto)
        {
            try
            {
                await _heroiService.CreateHeroi(heroiDto);
                return ReturnResponse();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHeroi([FromBody] HeroiDto heroiDto, int id)
        {
            try
            {
                await _heroiService.UpdateHeroi(heroiDto, id);
                return ReturnResponse();
            }
            catch (SystemException ex)
            {
                if(typeof(KeyNotFoundException) == ex.GetType())
                    return NotFound(ex.Message);
                else
                    return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeroi(int id)
        {
            try
            {
                await _heroiService.DeleteHeroi(id);
                return ReturnResponse();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
