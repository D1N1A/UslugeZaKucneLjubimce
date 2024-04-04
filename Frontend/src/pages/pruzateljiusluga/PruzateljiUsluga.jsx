import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; 
import PruzateljiUslugaService from "../../services/PruzateljUslugeServiceService";
import { RoutesNames } from "../../constants";

export default function PruzateljiUsluga() {
    const [pruzateljiUsluga, setPruzateljUsluge] = useState([]);
    const navigate = useNavigate();

    async function dohvatiPruzateljeUsluga() {
        try {
            const res = await PruzateljiUslugaService.getPruzateljiUsluga();
            setPruzateljUsluge(res.data);
        } catch (error) {
            alert(error);
        }
    }
    
    useEffect(() => {
        dohvatiPruzateljeUsluga();
    }, []);



    return (
        <Container>
            <Link to={RoutesNames.PRUZATELJIUSLUGA_NOVI} className="btn btn-success gumb">
                <TiDocumentAdd size={25} /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Ime</th>
                        <th className="sredina">Prezime</th>
                        <th className="sredina">Usluga</th>
                        <th className="sredina">Telefon</th>
                        <th className="sredina">Adresa</th>
                        <th className="sredina">ePosta</th>
                    </tr>
                </thead>
                <tbody>
                    {pruzateljiUsluga && pruzateljiUsluga.map((pruzateljusluge, index) => (
                        <tr key={index}>
                            <td className="sredina">{pruzateljusluge.ime}</td>
                            <td className="sredina">{pruzateljusluge.prezime}</td>
                            <td className="sredina">{pruzateljusluge.usluga}</td>
                            <td className="sredina">{pruzateljusluge.telefon}</td>
                            <td className="sredina">{pruzateljusluge.adresa}</td>
                            <td className="sredina">{pruzateljusluge.eposta}</td>
                            <td className="sredina">
                                <Button 
                                variant=""
                                onClick={()=>{navigate(`/pruzateljiusluga/${pruzateljusluge.sifra}`)}}>
                                    <CiEdit size={25} />
                                </Button>
                                &nbsp; &nbsp; &nbsp; 
                                <Button
                                    variant="danger"
                                    onClick={() => obrisiPruzateljUsluge(pruzateljusluge.sifra)}
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