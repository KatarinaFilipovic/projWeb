using System.Collections.Generic;

namespace webProj.Models
{
    public class PlesnaSkola
    {
          public int ID {get; set;}
         public string Naziv  {get; set;}
         public List<Ples> plesovi {get;set;}

    }
}