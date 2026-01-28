using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace viceri.desafio.server.Domain.Entities
{
    public class Superpoder
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public virtual IEnumerable<HeroiSuperpoder> HeroiSuperpoderes { get; set; }
    }
}
