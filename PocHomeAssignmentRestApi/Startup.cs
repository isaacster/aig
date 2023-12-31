using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PocHomeAssignmentRestApi.DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PocHomeAssignmentRestApi.Authentication;
using Microsoft.EntityFrameworkCore;
using Quartz.Impl;
using Quartz;
using JobScheduler;
using Quartz.AspNetCore;
using Quartz.Spi;

namespace PocHomeAssignmentRestApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
           
            services.AddCors(options =>




            {
                options.AddPolicy(name: "AllowAll",
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin()
                                       .AllowAnyMethod()
                                       .AllowAnyHeader();
                                      // .AllowCredentials();
                                  });

            });

            services.AddSingleton<IEmailScheduleService, EmailScheduleService>();

            //  Change Scoped to Singleton if you want a single instance throughout the application lifetime or Transient if you want a new instance every time it's requested.
            services.AddScoped<ILoggerRepository, LoggerRepository>();


            services.AddDbContext<LoggerDbContext>(options =>
         options.UseSqlServer(Configuration.GetConnectionString("LoggerDbContext")));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseAuthorization();

            app.UseCors("AllowAll");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
