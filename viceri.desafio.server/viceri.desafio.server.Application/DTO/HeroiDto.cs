using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Application.DTO
{
    public class HeroiDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string NomeHeroi { get; set; }
        public DateTime? DataNascimento { get; set; }
        public float Altura { get; set; }
        public float Peso { get; set; }
        public IEnumerable<SuperpoderDto> Superpoderes { get; set; }


        public static Heroi TranformToEntity(HeroiDto heroiDto)
        {
            return new Heroi()
            {
                Id = heroiDto.Id,
                Nome = heroiDto.Nome,
                NomeHeroi = heroiDto.NomeHeroi,
                DataNascimento = heroiDto.DataNascimento,
                Altura = heroiDto.Altura,
                Peso = heroiDto.Peso
            };
        }
        public static HeroiDto TranformToDto(Heroi heroi)
        {
            return new HeroiDto()
            {
                Id = heroi.Id,
                Nome = heroi.Nome,
                NomeHeroi = heroi.NomeHeroi,
                DataNascimento = heroi.DataNascimento,
                Altura = heroi.Altura,
                Peso = heroi.Peso
            };
        }


    }
}
