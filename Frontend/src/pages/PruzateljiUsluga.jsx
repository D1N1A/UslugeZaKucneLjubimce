import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; 
import StatusRezervacijeService from "../../services/StatusRezervacijeService";
import { RoutesNames } from "../../constants";

export default function StatusiRezervacija() {
    const [statusiRezervacija, setStatusRezervacije] = useState([]);
    const navigate = useNavigate();

    async function dohvatiStatuseRezervacija() {
        try {
            const res = await StatusRezervacijeService.getStatusiRezervacija();
            setStatusRezervacije(res.data);
        } catch (error) {
            alert(error);
        }
    }
    
    useEffect(() => {
        dohvatiStatuseRezervacija();
    }, []);

    function pokazatelj(statusrezervacije) {
        if (statusrezervacije.pokazatelj === null) return "gray";
        if (statusrezervacije.pokazatelj) return "green";
        return "red";
    }

    function pokazateljTitle(statusrezervacije) {
        if (statusrezervacije.pokazatelj === null) return 'Zahtjev na čekanju';
        if (statusrezervacije.pokazatelj) return 'Zahtjev obrađen';
        return 'Zahtjev u obradi';
    }

    async function obrisiStatusRezervacije(sifra){
      const odgovor =   await StatusRezervacijeService.obrisiStatusRezervacije(sifra);
      if (odgovor.ok){
        console(odgovor.poruka.data);
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
                        <th className="sredina">Pokazatelj</th>
                        <th className="sredina">Stanje</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {statusiRezervacija && statusiRezervacija.map((statusrezervacije, index) => (
                        <tr key={index}>
                            <td className="sredina">
                                <GrValidate
                                    size={25}
                                    color={pokazatelj(statusrezervacije)}
                                    title={pokazateljTitle(statusrezervacije)} 
                                />
                            </td>
                            <td className="sredina">{statusrezervacije.stanje ? statusrezervacije.stanje : pokazateljTitle(statusrezervacije)}</td>
                            <td className="sredina">
                                <Button 
                                variant=""
                                onClick={()=>{navigate(`/statusirezervacija/${statusrezervacije.sifra}`)}}>
                                    <CiEdit size={25} />
                                </Button>
                                &nbsp; &nbsp; &nbsp; 
                                <Button
                                    variant="danger"
                                    onClick={() => obrisiStatusRezervacije(statusrezervacije.sifra)}
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