import { App } from "../constants"
import { httpService } from "./httpService";

async function getStatusiRezervacija(){
    return await httpService.get('/StatusRezervacije')
    .then((res)=> {
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisiStatusRezervacije(sifra){
    return await httpService.delete('/StatusRezervacije/' + sifra)
    .then((res)=> {

        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodajStatusRezervacije(statusrezervacije) {
    const odgovor = await httpService.post('/StatusRezervacije', statusrezervacije)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
      //  console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promijeniStatusRezervacije(sifra,statusrezervacije) {
    const odgovor = await httpService.put('/StatusRezervacije'+ sifra, statusrezervacije)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promijenjeno'}
    })
    .catch((e)=>{
      //  console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}



export default{
    getStatusiRezervacija,
    obrisiStatusRezervacije,
    dodajStatusRezervacije,
    promijeniStatusRezervacije
  
};