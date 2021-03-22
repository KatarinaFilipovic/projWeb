import { Ples } from "./Ples.js";
import { Ucenik } from "./Ucenik.js";

export class PlesnaSkola
{
    constructor(naziv,id)//vidi za id
    {
        if(!naziv){
            this.naziv="";
        }
        else{
          this.naziv=naziv;

          this.idSkole=id;
        this.kontejner=null;
        this.listaPlesova=[];
    }
   }

    dodajPles(ples)
    {
        this.listaPlesova.push(ples);
    
    }

    crtajPlesnuSkolu(host)
    {
       if(!this.kontejner)
       {

        this.kontejner=document.createElement("div");
        this.kontejner.className="kontejner";
        host.appendChild(this.kontejner);

       
       }
      
        
        this.crtajFormu(this.kontejner);
        this.crtajPles(this.kontejner);

    }

    crtajFormu(roditelj)
    {   //imacemo formu za  plesove i za  ucenike
        let divf=document.createElement("div");
        divf.className="divForma"
        roditelj.appendChild(divf);
        
        var formUcenik=document.createElement("div");
        formUcenik.className="formUcenik";
        divf.appendChild(formUcenik);

        var formPles=document.createElement("div");
        formPles.className="formPles";
        divf.appendChild(formPles);

        this.crtajFormuUcenik(formUcenik);
     
     
        this.crtajFormuPles(formPles);

       

    }
    
    crtajFormuUcenik(formUcenik)
    {
        var lab=document.createElement("h3");
        lab.className="labUnosNaslov";
        lab.innerHTML="Unos ucenika";
        formUcenik.appendChild(lab);

        //id je skriven koristimo ga kod prikaza,edit
        let inpIdU=document.createElement("input");
        inpIdU.className="inputIdUcenika";
        formUcenik.appendChild(inpIdU);

        //ime
        lab=document.createElement("label");
        lab.innerHTML="Ime ucenika";
        lab.className="lab";
        formUcenik.appendChild(lab);

        let inp=document.createElement("input");
        inp.className="inputImeUcenika";
        formUcenik.appendChild(inp);

        //prezime
        let  labPrezime=document.createElement("label");
        labPrezime.innerHTML="Prezime ucenika";
        labPrezime.className="lab";
        formUcenik.appendChild(labPrezime);

        let inpPrezime=document.createElement("input");
        inpPrezime.className="inputPrezimeUcenika";
        formUcenik.appendChild(inpPrezime);

        //email
        let labEmail=document.createElement("label");
        labEmail.innerHTML="Email ucenika";
        formUcenik.appendChild(labEmail);
        labEmail.className="lab";

        let inpEmail=document.createElement("input");
        inpEmail.className="inputEmailUcenika";
        formUcenik.appendChild(inpEmail);

        let opcija=null;
        let labela=null;
        let divRb=null;

        let list=["a","b"];//izmenni sa listomPlesa
       
         this.listaPlesova.forEach(ples=>
            {
                divRb=document.createElement("div");
                formUcenik.appendChild(divRb);

                opcija=document.createElement("input");
                opcija.type="radio";
                opcija.name=this.naziv;//da bi se 1 cekiralo 
                opcija.value=ples.plesId;//mi viidimo 
              //  console.log(opcija.value);
                divRb.appendChild(opcija)

                labela=document.createElement("label");
                labela.innerHTML=ples.naziv;
                divRb.appendChild(labela);


            })

            const dugmeDodaj=document.createElement("button");
            dugmeDodaj.innerHTML="Dodaj ucenika";
            dugmeDodaj.className="dugmeDodajUcenika";
            dugmeDodaj.onclick=(ev)=>{ this.dodajUcenika()}
            formUcenik.appendChild(dugmeDodaj);

            let hh=document.createElement("h3");
            hh.className="labelaIzmenaBrisanje";
            hh.innerHTML="Izmena,brisanje ili prikaz";
            formUcenik.appendChild(hh);
            //div za izmenu ili brisanje
            let divIzmenaBrisanje=document.createElement("div");
            divIzmenaBrisanje.className="divIzmenaBrisanjeUcenika";
            formUcenik.appendChild(divIzmenaBrisanje);

            let sel = document.createElement("select");
            sel.className="selectUcenik";
            divIzmenaBrisanje.appendChild(sel);

           
            
            this.listaPlesova.forEach(p=>
                {
                    p.listaUcenika.forEach(u=>
                        {
                            let opcija = document.createElement("option");
                            opcija.innerHTML=u.ime+" "+u.prezime;
                            opcija.value=u.ucenikId;
                            
                            sel.appendChild(opcija);
                        })
                })

            let divDugmeta=document.createElement("div");
            divDugmeta.className="divDugmeta";
            divIzmenaBrisanje.appendChild(divDugmeta);

            //kada izaberemo iz select liste ucenika, popuunjava se input polja sa ppodacima
            //klikom na izmeni menja se ucenik
             let dugmeIzmeni=document.createElement("button");
             dugmeIzmeni.className="dugmeIzmeniUcenika";
             dugmeIzmeni.innerHTML="Izmeni";
             divDugmeta.appendChild(dugmeIzmeni);
             dugmeIzmeni.onclick=(ev)=>{ this.izmeniUcenika();}

             //kada izbaeremo iz select liste ucenika, brise se taj izabrani 
             let dugmeObrisi=document.createElement("button");
             dugmeObrisi.className="dugmeObrisiUcenika";
             dugmeObrisi.innerHTML="Obrisi";
             divDugmeta.appendChild(dugmeObrisi);
             dugmeObrisi.onclick=(ev)=>{ this.obrisiUcenika()}

             //kada izbaeremo iz select liste nekog ucenika, ispod ce se prikazti ime prezime,email ucenika
             let dugmePrikazi=document.createElement("button");
             dugmePrikazi.className="dugmePrikaziUcenika";
             dugmePrikazi.innerHTML="Prikazi";
             divDugmeta.appendChild(dugmePrikazi); 
             dugmePrikazi.onclick=(ev)=>{this.PrikaziUcenika()}

             //div za prikaz  ucenika
           /*  let l=document.createElement("label");
             l.innerHTML="Prikaz: ";
             l.className="labPrikaUc";
             formUcenik.appendChild(l);
             let divPrikaz=document.createElement("div");
             divPrikaz.className="divPrikazSelektovanogUcenika";
             formUcenik.appendChild(divPrikaz);*/
          

            


    }

    crtajFormuPles(roditelj)
    {
        //oznaka,naziv,maxBr,trBr,id
     
        let hh=document.createElement("h3");
        hh.className="UnosPlesaH";
        hh.innerHTML="Unos plesa-kursa";
        roditelj.appendChild(hh);
       

      

       let  lab=document.createElement("label");
        lab.innerHTML="Oznaka plesa ";
        lab.className="lab"
        roditelj.appendChild(lab);

        let inp=document.createElement("input");
        inp.className="inpOznakaPlesa";
        roditelj.appendChild(inp);

        
        lab=document.createElement("label");
        lab.innerHTML="Naziv plesa ";
        lab.className="lab";
        roditelj.appendChild(lab);

         inp=document.createElement("input");
        inp.className="inpNazivPlesa";
        roditelj.appendChild(inp);

         
        lab=document.createElement("label");
        lab.innerHTML="Max.broj ucenika  ";
        lab.className="lab";

        roditelj.appendChild(lab);

         inp=document.createElement("input");
        inp.className="inpMaxBrucenikaZaPles";
        inp.type="number";
        roditelj.appendChild(inp);

        lab=document.createElement("label");
        lab.className="lab";
        lab.innerHTML="Trenutni broj ucenika ";
        roditelj.appendChild(lab);

         inp=document.createElement("input");
        inp.className="inpTrBrucenikaZaPles";
        inp.type="number";
        roditelj.appendChild(inp);

        const dugmeDodaj=document.createElement("button");
        dugmeDodaj.innerHTML="Dodaj ples";
        dugmeDodaj.className="dugmeDodajPles";
        dugmeDodaj.onclick=(ev)=>{this.dodajPLesSkoli()}
        roditelj.appendChild(dugmeDodaj);
        
    }
    
    crtajPles(roditelj)
    {
       
      
        
        let divP=document.createElement("div");
        divP.className="divPlesCrtanje";
        roditelj.appendChild(divP);

        let h=document.createElement("h2");
        h.className="nazivSKoleH";
        h.innerHTML="Plesna skola "+this.naziv;
        divP.appendChild(h);

    

     
        this.listaPlesova.forEach(ples=>
            {
                ples.crtajPlesP(divP);
            })

    }
    dodajUcenika()
    {
        let ime=this.kontejner.querySelector(".inputImeUcenika").value;
        let prezime=this.kontejner.querySelector(".inputPrezimeUcenika").value;
        let email=this.kontejner.querySelector(".inputEmailUcenika").value;
        let p=this.kontejner.querySelector("input[type=radio]:checked");
        console.log(p);
        let plesId=null;
      
        if(p!=null)
        plesId=p.value;
        //ovo je id plesa(radio value=id) kome se dodaje student


      if(ime!=null && prezime!=null && email!=null && plesId!=null)
      {
         

        let trBroj=-1;
        let maxBr=-1;
        
        this.listaPlesova.forEach(p=>
            {
                if(plesId==p.plesId)
                {
                    trBroj=p.trBrUcenika;
                    maxBr=p.maxBrUcenika;
                    console.log(trBroj);

                }
            })
            if(trBroj<maxBr)
            {
                //[Route("dodajUcenikaPlesu/{idPlesa}/{ime}/{prezime}/{email}")]
                fetch("https://localhost:5001/Ples/dodajUcenikaPlesu/"+plesId+"/"+ime+"/"+prezime+"/"+email,
                {
                    method:"POST"
                }
               
                )
                this.osveziPrikaz();
                setTimeout(() => {location.reload()}, 3);
                
            }
            else
            {
                alert("nema mesta na tom plesu")
            }
        

      }
      else
      {
          alert("Popuni sva polja");
      }
       
        
    }
   
   PrikaziUcenika()
    {
        let idUcenika=this.kontejner.querySelector(".selectUcenik").value;
        console.log(idUcenika);
        let ime=null;
        let prezime=null;
        let email=null;
        let plesId=null;
        let idU=null;

        let imeInput=this.kontejner.querySelector(".inputImeUcenika");
        let prezimeInput=this.kontejner.querySelector(".inputPrezimeUcenika");
        let emailInput=this.kontejner.querySelector(".inputEmailUcenika");
        let idUcenInp=this.kontejner.querySelector(".inputIdUcenika");

        
    
        fetch("https://localhost:5001/Ples/procitajUcenika/"+idUcenika,
         {
           method:"GET"
         }).then(p=> p.json().then(data=>
            {    
                
                ime=data["ime"];
                prezime=data["prezime"];
                email=data["email"];
                idU=data["id"];
               
                imeInput.value=ime;
                prezimeInput.value=prezime;
                emailInput.value=email;
                idUcenInp.value=idU;
               
         
            } )) 
          

     this.listaPlesova.forEach( ples=>
            {
                ples.listaUcenika.forEach(u=>
                    {
                        if(u.ucenikId==idUcenika)
                        {
                             
                             plesId=ples.plesId;


                        }
                    })
            })

       
        
        let p=this.kontejner.querySelector("input[type=radio][value=\""+plesId+"\"]");
        p.checked=true;



    }

    obrisiUcenika()
    {
       
        let idUcenika=this.kontejner.querySelector(".selectUcenik").value;
        fetch("https://localhost:5001/Ples/obrisiUcenika/"+idUcenika,
        {
            method:"DELETE"
        })
        setTimeout(() => {location.reload()}, 3);




    }
    izmeniUcenika()
    {
        let imeInput=this.kontejner.querySelector(".inputImeUcenika").value;
        let prezimeInput=this.kontejner.querySelector(".inputPrezimeUcenika").value;
        let emailInput=this.kontejner.querySelector(".inputEmailUcenika").value;
        let idUcenInp=this.kontejner.querySelector(".inputIdUcenika").value;
        let p=this.kontejner.querySelector("input[type=radio]:checked").value;
        console.log(p);
        //[Route("izmeniUcenika/{id}/{ime}/{prezime}/{email}")]
        
        fetch("https://localhost:5001/Ples/izmeniUcenika/"+idUcenInp+"/"+imeInput+"/"+prezimeInput+"/"+emailInput,
        {
            method:"PUT"
        })
        setTimeout(() => {location.reload()}, 3);



    }

    dodajPLesSkoli()
    {
        let oznaka=this.kontejner.querySelector(".inpOznakaPlesa").value;
        let naziv=this.kontejner.querySelector(".inpNazivPlesa").value;
        let maxBr=this.kontejner.querySelector(".inpMaxBrucenikaZaPles").value;
        let trBr=this.kontejner.querySelector(".inpTrBrucenikaZaPles").value;
        console.log(this.idSkole);
        if(oznaka!=null && naziv!=null && maxBr!=null && trBr!=null)
        {
               //[Route("UpisiPles/{idSkole}/{naziv}/{oznaka}/{trBr}/{maxBr}")]
              console.log("uuso sam");
               fetch("https://localhost:5001/Ples/UpisiPles/"+this.idSkole+"/"+naziv+"/"+oznaka+"/"+trBr+"/"+maxBr,
               {
                   method:"POST"
               }
              
               )
               setTimeout(() => {location.reload()}, 3);

              
        }
    }
    vratiProdavnicu()
    {
        let plskola=null;

        fetch("https://localhost:5001/Ples/procitajSkolu/"+this.idSkole,
        {
          method:"GET"
        }).then(p=> p.json().then(data=>
           {    
             plskola=new  PlesnaSkola(data["naziv"],data["id"]);
            
            data["plesovi"].forEach(pl=>
                {
                    let ples=new Ples(pl["oznaka"],pl["naziv"],pl["maxBrUcenika"],pl["trBrUcenika"],pl["id"]);
                    plskola.dodajPles(ples);

                    pl["ucenici"].forEach(ucen=>    //lista ucenika koji pripadaju pl(plesu)
                        {
                            let u=new Ucenik(ucen["ime"],ucen["prezime"],ucen["id"],ucen["email"]);
                           // console.log(u);
                          ples.dodajUcenika(u);


                            

                        })
                        console.log(ples);
                    
                    
                    
                   
                })
              
        
           } )) 
           console.log(plskola);
           return  plskola;

    }
    osveziPrikaz()
    {
       
      /*  let divP=this.kontejner.querySelector(".divPlesCrtanje");
        divP.innerHTML="";

        let sk= this.vratiProdavnicu();
       console.log(sk);
       
        sk.listaPlesova.forEach(ples=>
            {
                ples.crtajPlesP(divP);
            })
*/
    }
    

}
