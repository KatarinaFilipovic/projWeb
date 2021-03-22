using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace webProj.Models
{
    public class Ples
    {
        public int ID {get; set;}
        public string Oznaka  {get; set;}
        public string Naziv {get;set; }
        public int MaxBrUcenika {get;set;}
        public int TrBrUcenika {get;set;}
        
        public virtual List<Ucenik> Ucenici {get;set;}
        
       [JsonIgnore]
        public PlesnaSkola PlesnaSkola {get;set;}
    }
}