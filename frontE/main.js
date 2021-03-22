import { Ples } from "./Ples.js";
import { PlesnaSkola } from "./PlesnaSkola.js";
import { Ucenik } from "./Ucenik.js";


const skola=new PlesnaSkola("DanceStye");
const ples=new Ples("00","samba",11,0,111);
//ples.dodajUcenika(new Ucenik("marko","maric","eee"));
//skola.crtajPlesnuSkolu(document.body);

fetch("https://localhost:5001/Ples/PreuzmiPlesneSkole",
{
    method:"GET"
}).then(p=> p.json().then(data=>
    {
        console.log(data);
       //data su raspakovani podaci,lista skole
       data.forEach(skola =>
        {
            let plskola=new  PlesnaSkola(skola["naziv"],skola["id"]);
            
            skola["plesovi"].forEach(pl=>
                {
                    let ples=new Ples(pl["oznaka"],pl["naziv"],pl["maxBrUcenika"],pl["trBrUcenika"],pl["id"]);
                    plskola.dodajPles(ples);

                    pl["ucenici"].forEach(ucen=>    //lista ucenika koji pripadaju pl(plesu)
                        {
                            let u=new Ucenik(ucen["ime"],ucen["prezime"],ucen["id"],ucen["email"]);
                           // console.log(u);
                          ples.dodajUcenika(u);


                            

                        })
                        console.log(ples.listaUcenika);
                    
                    
                    
                   
                })
                plskola.crtajPlesnuSkolu(document.body);
               
        })
    }))

