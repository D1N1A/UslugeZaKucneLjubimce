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



export default{
    getStatusiRezervacija,
    obrisiStatusRezervacije
  
};