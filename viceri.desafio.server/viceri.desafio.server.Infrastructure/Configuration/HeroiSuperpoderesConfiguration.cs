using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using viceri.desafio.server.Domain.Entities;

namespace viceri.desafio.server.Infrastructure.Configuration
{
    public class HeroiSuperpoderesConfiguration : IEntityTypeConfiguration<HeroiSuperpoder>
    {
        public void Configure(EntityTypeBuilder<HeroiSuperpoder> builder)
        {
            builder.ToTable("heroissuperpoderes");
            builder.HasKey(x => new { x.HeroiId, x.SuperpoderId });

            builder.Property(x => x.HeroiId).IsRequired();
            builder.Property(x => x.SuperpoderId).IsRequired();
        }
    }
}
