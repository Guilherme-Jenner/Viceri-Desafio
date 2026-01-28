using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Infrastructure.Configuration
{
    public class SuperpoderConfiguration : IEntityTypeConfiguration<Superpoder>
    {
        public void Configure(EntityTypeBuilder<Superpoder> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Nome)
                .HasColumnName("Superpoder")
                .IsRequired();
            builder.Property(x => x.Descricao);

            builder.HasMany(x => x.HeroiSuperpoderes)
                .WithOne(x => x.Superpoder)
                .HasForeignKey(x => x.SuperpoderId);
        }
    }
}
