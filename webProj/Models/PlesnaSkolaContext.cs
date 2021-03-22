
using Microsoft.EntityFrameworkCore;

namespace webProj.Models
{
    //kreiramo jedan obj, i predstvlja kao neku bazu
    //dbsset predstvalja tabelu 
    public class PlesnaSkolaContext : DbContext
    {
       public  DbSet<Ucenik> Ucenici {get;set;}
        public DbSet<PlesnaSkola> PlesneSkole {get;set;}
       public  DbSet<Ples> Plesovi {get;set;}
        
        public PlesnaSkolaContext(DbContextOptions options):base(options)
        {

        }

      
    }
}