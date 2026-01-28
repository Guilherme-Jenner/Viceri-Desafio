using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Domain.Interfaces
{
    public interface IHeroiRepository
    {
        Task<IEnumerable<Heroi>> GetAllHerois();
        Task<IEnumerable<Superpoder>> GetAllPoderes();
        Task<Heroi> GetHeroiById(int id);
        Task CreateHeroi(Heroi entity);
        Task AssociarHeroiSuperPoder(HeroiSuperpoder heroiSuperpoder);
        Task DesassociarHeroiSuperPoder(int heroiId);
        Task UpdateHeroi(Heroi entity);
        Task DeleteHeroi(Heroi entity);
        Task<bool> NomeHeroiJaExiste(string nomeHeroi);
        //Task<IEnumerable<Superpoder>> GetSuperpoderesByHeroiId(int heroiId);
    }
}
