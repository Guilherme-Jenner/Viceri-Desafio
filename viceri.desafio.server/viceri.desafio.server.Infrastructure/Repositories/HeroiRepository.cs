using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Domain.Entities;
using viceri.desafio.server.Domain.Interfaces;
using viceri.desafio.server.Infrastructure.Context;

namespace viceri.desafio.server.Infrastructure.Repositories
{
    public class HeroiRepository : IHeroiRepository
    {
        private readonly DatabaseContext _dbContext;

        public HeroiRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateHeroi(Heroi entity)
        {
            _dbContext.Herois.Add(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task AssociarHeroiSuperPoder(HeroiSuperpoder heroiSuperpoder)
        {
            _dbContext.HeroiSuperpoderes.Add(heroiSuperpoder);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DesassociarHeroiSuperPoder(int heroiId)
        {
            var heroisSupepoderes = await _dbContext.HeroiSuperpoderes.Where(x => x.HeroiId == heroiId).ToListAsync();
            _dbContext.HeroiSuperpoderes.RemoveRange(heroisSupepoderes);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteHeroi(Heroi entity)
        {
            _dbContext.Herois.Remove(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Heroi>> GetAllHerois()
            => await _dbContext.Herois.Include(x => x.HeroiSuperpoderes)
            .ThenInclude(x => x.Superpoder).ToListAsync();

        public async Task<IEnumerable<Superpoder>> GetSuperpoderesByHeroiId(int heroiId)
            => await _dbContext.HeroiSuperpoderes 
                .Where(x => x.HeroiId == heroiId) 
                .Select(x => x.Superpoder)        
                .ToListAsync();

        public async Task<IEnumerable<Superpoder>> GetAllPoderes()
            => await _dbContext.Superpoderes.ToListAsync();

        public async Task<Heroi> GetHeroiById(int id)
            => await _dbContext.Herois.Include(x => x.HeroiSuperpoderes).ThenInclude(x => x.Superpoder).FirstOrDefaultAsync(x => x.Id == id);

        public async Task UpdateHeroi(Heroi entity)
        {
            _dbContext.Herois.Update(entity);

            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> NomeHeroiJaExiste(string nomeHeroi)
            => await _dbContext.Herois.AnyAsync(x => x.NomeHeroi == nomeHeroi);

    }
}
