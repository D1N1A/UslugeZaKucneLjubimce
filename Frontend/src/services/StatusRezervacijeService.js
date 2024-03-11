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

export default{
    getStatusiRezervacija
};