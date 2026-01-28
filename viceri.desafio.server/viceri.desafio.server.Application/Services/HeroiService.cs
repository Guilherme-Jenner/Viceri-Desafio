using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Application.DTO;
using viceri.desafio.server.Application.Interfaces;
using viceri.desafio.server.Domain.Entities;
using viceri.desafio.server.Domain.Interfaces;

namespace viceri.desafio.server.Application.Services
{
    public class HeroiService : IHeroiService
    {
        private readonly IHeroiRepository _heroiRepository;

        public HeroiService(IHeroiRepository heroiRepository)
        {
            _heroiRepository = heroiRepository;
        }


        public async Task CreateHeroi(HeroiDto heroiDto)
        {
            var nomeHeroiJaExiste = await _heroiRepository.NomeHeroiJaExiste(heroiDto.NomeHeroi);

            if (nomeHeroiJaExiste)
            {
                throw new ArgumentException("Já existe um herói com este nome.");
            }

            var heroi = HeroiDto.TranformToEntity(heroiDto);
            await _heroiRepository.CreateHeroi(heroi);

            foreach (var superpoder in heroiDto.Superpoderes)
            {
                HeroiSuperpoder superPoder = new HeroiSuperpoder() { HeroiId = heroi.Id, SuperpoderId = superpoder.Id };
                
                await _heroiRepository.AssociarHeroiSuperPoder(superPoder);
            }
        }

        public async Task DeleteHeroi(int id)
        {
            var heroi = await _heroiRepository.GetHeroiById(id);

            if (heroi is null)
            {
                throw new KeyNotFoundException("Herói não encontrado.");
            }

            await _heroiRepository.DeleteHeroi(heroi);
        }

        public async Task<IEnumerable<HeroiDto>> GetAllHerois()
        {
            var herois = await _heroiRepository.GetAllHerois();

            var heroisDto = herois.ToList().Select(x =>
            {
                var y = HeroiDto.TranformToDto(x);

                y.Superpoderes = x.HeroiSuperpoderes.Select(z => SuperpoderDto.TranformToDto(z.Superpoder));

                return y;
            });

            return heroisDto;
        }

        public async Task<IEnumerable<SuperpoderDto>> GetAllPoderes()
        {
            var poderes = await _heroiRepository.GetAllPoderes();

            return poderes.Select(x => SuperpoderDto.TranformToDto(x));
        }

        public async Task<HeroiDto> GetHeroiById(int id)
        {
            var heroi = await _heroiRepository.GetHeroiById(id);

            if(heroi is null)
            {
                throw new KeyNotFoundException("Herói não encontrado.");
            }

            var heroiDto = HeroiDto.TranformToDto(heroi);
            heroiDto.Superpoderes = heroi.HeroiSuperpoderes.Select(x => SuperpoderDto.TranformToDto(x.Superpoder));

            return heroiDto;
        }

        public async Task UpdateHeroi(HeroiDto heroiDto, int id)
        {
            if(heroiDto.Id != id)
            {
                throw new InvalidOperationException("Id do Parâmetro é diferente do Id do Herói a ser alterado");
            }

            var heroi = await _heroiRepository.GetHeroiById(id);

            if(heroi is null)
            {
                throw new KeyNotFoundException("Herói não encontrado.");
            }

            var nomeHeroiJaExiste = await _heroiRepository.NomeHeroiJaExiste(heroiDto.NomeHeroi);

            if (nomeHeroiJaExiste)
            {
                throw new ArgumentException("Já existe um herói com este nome.");
            }

            heroi.Nome = heroiDto.Nome;
            heroi.NomeHeroi = heroiDto.NomeHeroi;
            heroi.DataNascimento = heroiDto.DataNascimento;
            heroi.Altura = heroiDto.Altura;
            heroi.Peso = heroiDto.Peso;

            await _heroiRepository.UpdateHeroi(heroi);
            await _heroiRepository.DesassociarHeroiSuperPoder(heroi.Id);

            foreach (var superpoder in heroiDto.Superpoderes)
            {
                HeroiSuperpoder superPoder = new HeroiSuperpoder() { HeroiId = heroi.Id, SuperpoderId = superpoder.Id };

                await _heroiRepository.AssociarHeroiSuperPoder(superPoder);
            }
        }
    }
}
