import { App } from "../constants"
import { httpService } from "./httpService";

async function get(){
    return await httpService.get('/Usluga')
    .then((res)=> {
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisi(sifra){
    return await httpService.delete('/Usluga/' + sifra)
    .then((res)=> {

        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodaj(usluga) {
    const odgovor = await httpService.post('/Usluga', usluga)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeni(sifra,usluga) {
    const odgovor = await httpService.put('/Usluga/'+ sifra, usluga)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promijenjeno'}
    })
    .catch((e)=>{
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Usluga/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}





export default{
    get,
    obrisi,
    dodaj,
    promjeni,
    getBySifra
  
};