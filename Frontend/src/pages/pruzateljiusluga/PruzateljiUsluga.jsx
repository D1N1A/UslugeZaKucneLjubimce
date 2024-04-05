import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; 
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";

export default function PruzateljiUsluga() {
    const [pruzateljiUsluga, setPruzateljiUsluga] = useState([]);
    const navigate = useNavigate();

    async function dohvatiPruzateljeUsluga() {
        await PruzateljUslugeService.get()
            .then((res) => {
                console.log(res.data);
                setPruzateljiUsluga(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    }
    
    useEffect(() => {
        dohvatiPruzateljeUsluga();
    }, []);

    async function obrisiPruzateljaUsluge(sifra) {
        const odgovor = await PruzateljUslugeService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiPruzateljeUsluga();
        } else {
          alert(odgovor.poruka);
        }
      }

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
                    {pruzateljiUsluga && pruzateljiUsluga.map((pruzateljUsluge, index) => (
                        <tr key={index}>
                            <td className="sredina">{pruzateljUsluge.ime}</td>
                            <td className="sredina">{pruzateljUsluge.prezime}</td>
                            <td className="sredina">{pruzateljUsluge.uslugaNaziv}</td>
                            <td className="sredina">{pruzateljUsluge.telefon}</td>
                            <td className="sredina">{pruzateljUsluge.adresa}</td>
                            <td className="sredina">{pruzateljUsluge.eposta}</td>
                            <td className="sredina">
                                <Button 
                                variant=""
                                onClick={()=>{navigate(`/pruzateljiusluga/${pruzateljUsluge.sifra}`)}}>
                                    <CiEdit size={25} />
                                </Button>
                                &nbsp; &nbsp; &nbsp; 
                                <Button
                                    variant="danger"
                                    onClick={() => obrisiPruzateljaUsluge(pruzateljUsluge.sifra)}
                                >
                                    <MdDelete size={25} />
                                </Button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
        </Container>
    );
};