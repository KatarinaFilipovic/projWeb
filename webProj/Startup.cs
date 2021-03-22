using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using webProj.Models;

namespace webProj
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

//povezali smo se sa bazom
        public void ConfigureServices(IServiceCollection services)
        {
            //
            services.AddCors(options=> 
            {
                options.AddPolicy("CORS",builder=>
                {
                    builder.AllowAnyHeader() //radi sa bilo kojim hedorem,metodom
                    .AllowAnyMethod()
                    //.WithOrigins(new String [] {"http://127.0.0.1:5500"});//pristupa smao sa ove adrese
                    .AllowAnyOrigin();//prihvata sa bilo koje adrese
                   
                });

            });
            services.AddControllers();
            services.AddDbContext<PlesnaSkolaContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("PlesnaSk"));
            });
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

            app.UseCors("CORS");//

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
