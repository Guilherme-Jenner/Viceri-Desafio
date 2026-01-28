using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Infrastructure.Configuration
{
    public class HeroiConfiguration : IEntityTypeConfiguration<Heroi>
    {
        public void Configure(EntityTypeBuilder<Heroi> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Nome).IsRequired();
            builder.Property(x => x.NomeHeroi).IsRequired();
            builder.Property(x => x.DataNascimento);
            builder.Property(x => x.Altura).IsRequired();
            builder.Property(x => x.Peso).IsRequired();

            builder.HasMany(x => x.HeroiSuperpoderes)
                   .WithOne(x => x.Heroi)
                   .HasForeignKey(x => x.HeroiId);
        }
    }
}
