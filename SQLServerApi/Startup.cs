using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SQLServerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using SQLServerApi.Reposotories;

namespace SQLServerApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddControllers().AddNewtonsoftJson(
                s => {
                    s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddMvc().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            // Add DbContexts
            services.AddDbContext<XtecDigitalDBContext>(opt => opt.UseSqlServer
                (Configuration.GetConnectionString("XtecDigitalConnection")));

            // Customize our CORS policy
            services.AddCors(o => o.AddPolicy(
                "CORS_POLICY",
                builder => {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                }));

            // TODO: Agregar las Inyecciones de Dependencias
            services.AddScoped<CursoRepo>();
            services.AddScoped<ProfesorRepo>();
            services.AddScoped<RubroRepo>();
            services.AddScoped<CarpetaRepo>();
            services.AddScoped<ArchivoRepo>();
            services.AddScoped<EvaluacionRepo>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // Apply CORS Policy to every request
            app.UseCors("CORS_POLICY");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
