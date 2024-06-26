import { App } from "../constants"
import { httpService } from "./httpService";

async function get(){
    return await httpService.get('/PruzateljUsluge')
    .then((res)=> {
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisi(sifra){
    return await httpService.delete('/PruzateljUsluge/' + sifra)
    .then((res)=> {

        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodaj(pruzateljusluge) {
    const odgovor = await httpService.post('/PruzateljUsluge', pruzateljusluge)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeni(sifra,pruzateljusluge) {
    const odgovor = await httpService.put('/PruzateljUsluge/'+ sifra, pruzateljusluge)
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
        return {ok: false, poruka: 'Greška'}
    });
}




export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra
};