import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"; 
import StatusRezervacijeService from "../../services/StatusRezervacijeService";
import { RoutesNames } from "../../constants"

export default function StatusiRezervacija() {
    const [statusiRezervacija, setStatusRezervacije] = useState([]);

    async function dohvatiStatuseRezervacija() {
        await StatusRezervacijeService.getStatusiRezervacija()
        .then((res)=>{
            setStatusRezervacije(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
    

    
    useEffect(() => {
        dohvatiStatuseRezervacija();
    }, []);




    function stanje(statusrezervacije) {
        if (statusrezervacije.stanje === null) return "gray";
        if (statusrezervacije.stanje) return "green";
        return "red";
    }

    function pokazateljTitle(statusrezervacije) {
        if (statusrezervacije.pokazatelj === null) return 'Zahtjev na čekanju';
        if (statusrezervacije.pokazatelj) return 'Zahtjev obrađen';
        return 'Zahtjev u obradi';
    }

    async function obrisi(statusrezervacije) {
        try {

            console.log('Brisanje statusa rezervacije:', statusrezervacije);
        } catch (error) {
            console.error('Greška prilikom brisanja statusa rezervacije:', error);
        }
    }

    async function obrisiStatusRezervacije(sifra) {
        const odgovor = await StatusRezervacijeService.obrisiStatusRezervacije(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiStatuseRezervacija();
        }
        
    }

    return (
        <Container>
            <Link to={RoutesNames.STATUSIREZERVACIJA_NOVI} className="btn btn-success gumb">
                <TiDocumentAdd size={25} /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Stanje</th>
                        <th className="sredina">Pokazatelj</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {statusiRezervacija && statusiRezervacija.map((statusrezervacije, index) => (
                        <tr key={index}>
                            <td className="sredina">
                                <GrValidate
                                    size={25}
                                    color={stanje(statusrezervacije)}
                                    title={pokazateljTitle(statusrezervacije)}
                                />
                            </td>
                            <td className="sredina">{statusrezervacije.pokazatelj}</td>
                            <td className="sredina">
                                <Link to={RoutesNames.STATUSIREZERVACIJA_PROMIJENI}>
                                    <CiEdit size={25} />
                                </Link>
                                &nbsp; &nbsp; &nbsp; 
                                <Button
                                    variant = "danger"
                                    onClick={()=>obrisiStatusRezervacije(statusrezervacije.sifra)}
                                    >
                                    <MdDelete size={25} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};