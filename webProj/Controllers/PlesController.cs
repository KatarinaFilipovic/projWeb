using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using webProj.Models;
namespace webProj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlesController : ControllerBase
    {

        public PlesnaSkolaContext Context { get;set;}

        public PlesController(PlesnaSkolaContext context)
        {
           Context=context;
        }

       [Route("procitajSkolu/{id}")]
        [HttpGet]
        public async Task<PlesnaSkola> procitaPlesnuSKolu(int id)
        {
            
            var skola=await Context.PlesneSkole
            .Include(p =>p.plesovi)
            .ThenInclude(u =>u.Ucenici)
            .FirstOrDefaultAsync(x => x.ID == id);

           // await Context.PlesneSkole.Include().ThenInclude().FirstOrDefaultAsync()
            return skola;
        }

        //lista skola koje se vracaju
        [Route("PreuzmiPlesneSkole")]
        [HttpGet]
        public async Task<List<PlesnaSkola>> preuzmiPlesneSkole()
        {
            return await Context.PlesneSkole
            .Include(p =>p.plesovi)
            .ThenInclude(u =>u.Ucenici)//vidi ovo da li hoce, ovo ikudujemo sve sto nam treba
            .ToListAsync();  //osim osnovnih podataka o skoli
        }

      
        [Route("UpisiPlesnuSkolu")]
        [HttpPost]
        public async Task upisiSkolu([FromBody] PlesnaSkola plesnaskola) //task=void
        {
            Context.PlesneSkole.Add(plesnaskola);///ovo je lokalno
            await Context.SaveChangesAsync();//sacuvno u bazi 

        }


          //dodavaje plesa
        [Route("UpisiPles/{idSkole}/{naziv}/{oznaka}/{trBr}/{maxBr}")]
        [HttpPost]
        public async Task upisiPlesUSkolu(int idSkole,string naziv,string oznaka,int trBr,int maxBr  )
        {
            Ples ples=new Ples();
            ples.Naziv=naziv;
            ples.Oznaka=oznaka;
            ples.MaxBrUcenika=maxBr;
            ples.TrBrUcenika=trBr;

            var skola=await Context.PlesneSkole.FindAsync(idSkole);
            ples.PlesnaSkola=skola;  //ref na skolu kojoj pripada ples
             
             //da skola isto u svojoj listi ima ovaj ples.ovo on nije pisao
            /* skola.plesovi.Add(ples);
             Context.PlesneSkole.Update(skola);*/
            /////////////////

            Context.Plesovi.Add(ples); //dodajemo u listu plesova
            await Context.SaveChangesAsync();


    
        }

        [Route("dodajUcenikaPlesu/{idPlesa}/{ime}/{prezime}/{email}")]
        [HttpPost]
        public async Task dodajUcenikaPLesu(int idPlesa,string ime,string prezime,string email)
        {
            Ucenik ucenik=new Ucenik();
            ucenik.Ime=ime;
            ucenik.Prezime=prezime;
            ucenik.Email=email;

            var ples=await Context.Plesovi.FindAsync(idPlesa); //kod radio dugmeta u value da stavimo idplesa
            ucenik.PLes=ples;


            ples.TrBrUcenika++;
        
            //dodavanje ucenika u listu 
            Context.Ucenici.Add(ucenik);
            await Context.SaveChangesAsync();
            


        }
        
        [Route("obrisiUcenika/{id}")]
        [HttpDelete]
        public async Task obrisiUcenika(int id)
        {
            var ucenik=await Context.Ucenici.FindAsync(id);
            var plesId=await Context.Ucenici.Where(u =>u.ID==id).Select(p =>p.PLes.ID ).FirstOrDefaultAsync();
            //nije htelo kada idemo ucenik.ples.id!!

            var ples=await Context.Plesovi.FindAsync(plesId);
            ples.TrBrUcenika--;//ovo se cuva u bazi,ova izmena(ne moramo mi update)
           
            Context.Ucenici.Remove(ucenik);
            await Context.SaveChangesAsync();
           
        }

        [Route("izmeniUcenika/{id}/{ime}/{prezime}/{email}")]
        [HttpPut]
        public async Task izmeniUcenika(int id,string ime,string prezime,string email)
        {
            var ucenik=await Context.Ucenici.FindAsync(id);
           
            ucenik.Ime=ime;
            ucenik.Prezime=prezime;
            ucenik.Email=email;
            ucenik.ID=id;
           

           var plesId=await Context.Ucenici.Where(u =>u.ID==id).Select(p =>p.PLes.ID ).FirstOrDefaultAsync();
            var ples=await Context.Plesovi.FindAsync(plesId);
            
            ucenik.PLes=ples;

            Context.Update<Ucenik>(ucenik);
            await Context.SaveChangesAsync();

        }
        [Route("procitajUcenika/{id}")]
        [HttpGet]
        public async Task<Ucenik> procitajUcenika(int id)
        {
            var ucenik=await Context.Ucenici.FindAsync(id);
            return ucenik;
        }



    



    
    }
}
