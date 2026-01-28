using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using viceri.desafio.server.Application.Interfaces;
using viceri.desafio.server.Application.Services;
using viceri.desafio.server.Domain.Interfaces;
using viceri.desafio.server.Infrastructure.Context;
using viceri.desafio.server.Infrastructure.Repositories;

namespace viceri.desafio.server.IOC
{
    public static class DepedencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ConexaoBanco");
            // Configurar o DbContext
            services.AddDbContext<DatabaseContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)
                )
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors()
            );

            // Registrar repositórios
            services.AddScoped<IHeroiRepository, HeroiRepository>();

            // Registrar serviços
            services.AddScoped<IHeroiService, HeroiService>();

            return services;
        }

    }
}
