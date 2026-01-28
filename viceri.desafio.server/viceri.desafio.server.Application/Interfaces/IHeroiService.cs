using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Application.DTO;

namespace viceri.desafio.server.Application.Interfaces
{
    public interface IHeroiService
    {
        Task<IEnumerable<HeroiDto>> GetAllHerois();
        Task<IEnumerable<SuperpoderDto>> GetAllPoderes();
        Task<HeroiDto> GetHeroiById(int id);
        Task CreateHeroi(HeroiDto entity);
        Task UpdateHeroi(HeroiDto entity, int id);
        Task DeleteHeroi(int id);
    }
}
