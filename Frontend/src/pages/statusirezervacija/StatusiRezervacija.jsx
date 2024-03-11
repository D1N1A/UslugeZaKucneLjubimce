import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import StatusRezervacijeService from "../../services/StatusRezervacijeService";


export default function StatusiRezervacija (){
    const [statusiRezervacija,setStatusiRezervacije] = useState();

    async function dohvatiStatuseRezervacija(){
        await StatusRezervacijeService.getStatusiRezervacija()
        .then((res)=>{
            setStatusiRezervacije(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiStatuseRezervacija();
    },[]);
   
    
    return (

        <Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr> 
                        <th>Naziv</th>
                        <th>Pokazatelj</th>
                     </tr>
                </thead>
                <tbody>
                    {statusiRezervacija && statusiRezervacija.map((statusrezervacije,index)=>(
                        <tr key={index}>
                            <td>{statusrezervacije.naziv}</td>
                            <td>{statusrezervacije.pokazatelj}</td>
                            <td>Akcija</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}