import { App } from "../constants"
import { httpService } from "./httpService";

async function get(){
    return await httpService.get('/Klijent')
    .then((res)=> {
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisi(sifra){
    return await httpService.delete('/Klijent/' + sifra)
    .then((res)=> {

        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodaj(klijent) {
    const odgovor = await httpService.post('/Klijent', klijent)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeni(sifra,klijent) {
    const odgovor = await httpService.put('/Klijent/'+ sifra, klijent)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promijenjeno'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Klijent/' + sifra)
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