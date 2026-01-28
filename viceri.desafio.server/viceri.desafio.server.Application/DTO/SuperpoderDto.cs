using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Application.DTO
{
    public class SuperpoderDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public static SuperpoderDto TranformToDto(Superpoder heroi)
        {
            return new SuperpoderDto()
            {
                Id = heroi.Id,
                Nome = heroi.Nome,
                Descricao = heroi.Descricao
            };
        }
    }
}
