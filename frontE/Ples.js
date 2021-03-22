
export class Ples
{
    constructor(oznaka,naziv,maxBr,trBr,id)
    {
        
        if(!oznaka)
            this.oznaka="";
        else
          this.oznaka=oznaka;

          
        if(!naziv)
            this.naziv=""; 
        else
          this.naziv=naziv;
          
      
        if(!maxBr)
            this.maxBrUcenika=10;
        else
          this.maxBrUcenika=maxBr;
         
        if(!trBr)
          this.trBrUcenika=0;
         else
        this.trBrUcenika=trBr;

        this.plesId=id;
        this.miniKontejner=null;
        this.listaUcenika=[];


    }
    dodajUcenika(uc)
    {
        this.listaUcenika.push(uc);
        
    }
    crtajPlesP(roditelj)
    {
         this.miniKontejner=document.createElement("div");
            this.miniKontejner.className="plesMiniKontejner";
            roditelj.appendChild(this.miniKontejner);

        
      

        let lab=document.createElement("label");
        lab.innerHTML=this.naziv;
        lab.className="labNazivPlesa";
        this.miniKontejner.appendChild(lab);

        let divUcenici=document.createElement("div");
        divUcenici.className="divUcenici";
        this.miniKontejner.appendChild(divUcenici);

        for(let i=0; i<this.maxBrUcenika; i++)
        {
            if(this.listaUcenika[i]!=null)
            {
                let sirina=divUcenici.style.width/this.maxBrUcenika;
                this.listaUcenika[i].crtajUcenika(divUcenici);//1-ima ucenika
            }
            else
            {
              let divU=document.createElement("div");
               divU.className="miniKontejnerUcenik";
               divU.innerHTML="Prazno";
               divUcenici.appendChild(divU);
                
            }
        }

         lab=document.createElement("lab");
        lab.innerHTML=this.trBrUcenika+"/"+this.maxBrUcenika;
        lab.className="LabTrBrMax";
        this.miniKontejner.appendChild(lab);
    }
}