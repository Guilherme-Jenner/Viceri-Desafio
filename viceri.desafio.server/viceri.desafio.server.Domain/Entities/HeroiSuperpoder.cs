using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace viceri.desafio.server.Domain.Entities
{
    public class HeroiSuperpoder
    {
        public int HeroiId { get; set; }
        public int SuperpoderId { get; set; }

        public virtual Heroi Heroi { get; set; }
        public virtual Superpoder Superpoder { get; set; }
    }
}
