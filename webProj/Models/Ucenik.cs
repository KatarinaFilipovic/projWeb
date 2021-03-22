using System.Text.Json.Serialization;

namespace webProj.Models
{
    public class Ucenik 
    {
        public int ID {get;set;}
        public string Ime {get;set;}
        public string Prezime {get;set;}
        public string Email {get;set;}

        [JsonIgnore]
        public Ples PLes {get;set;}


    }
}