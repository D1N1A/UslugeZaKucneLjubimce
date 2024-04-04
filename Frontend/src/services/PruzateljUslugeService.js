import { App } from "../constants"
import { httpService } from "./httpService";

async function getPruzateljiUsluga(){
    return await httpService.get('/PruzateljUsluge')
    .then((res)=> {
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisiPruzateljUslulge(sifra){
    return await httpService.delete('/PruzateljUsluge/' + sifra)
    .then((res)=> {

        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodajPruzateljUsluge(PruzateljUsluge) {
    const odgovor = await httpService.post('/PruzateljUsluge', dodajPruzateljUsluge)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promijeniPruzateljUsluge(sifra,pruzateljusluge) {
    const odgovor = await httpService.put('/PruzateljUsluge'+ sifra, statusrezervacije)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promijenjeno'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/PruzateljUsluge/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}





export default{
    getPruzateljiUsluga,
    obrisiPruzateljUslulge,
    dodajPruzateljUsluge,
    promijeniPruzateljUsluge,
    getBySifra
  
};