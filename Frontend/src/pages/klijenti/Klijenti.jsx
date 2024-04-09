import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; 
import { RoutesNames } from "../../constants";
import KlijentService from "../../services/KlijentService";


export default function Klijenti() {
    const [Klijenti, setKlijenti] = useState();
    const navigate = useNavigate();

    async function dohvatiKlijente() {
        await KlijentService.get()
            .then((res) => {
                console.log(res.data);
                setKlijenti(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    }
    
    useEffect(() => {
        dohvatiKlijente();
    }, []);

    async function obrisi(sifra) {
        const odgovor = await KlijentService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiKlijente();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (
        <Container>
            <Link to={RoutesNames.KLIJENTI_NOVI} className="btn btn-success gumb">
                <TiDocumentAdd size={25} /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Usluge</th>
                        <th className="sredina">Pružatelji usluga</th>
                        <th className="sredina">Ime klijenta</th>
                        <th className="sredina">Pasmina</th>
                        <th className="sredina">Napomena</th>
                        <th className="sredina">Ime vlasnika</th>
                        <th className="sredina">Prezime vlasnika</th>
                        <th className="sredina">Telefon</th>
                        <th className="sredina">ePošta</th>
                        <th className="sredina">Status rezervacije</th>
                    </tr>
                </thead>
                <tbody>
                    {Klijenti && Klijenti.map((klijent, index) => (
                        <tr key={index}>
                            <td className="sredina">{klijent.usluge}</td>
                            <td className="sredina">{klijent.pruzateljUsluge}</td>
                            <td className="sredina">{klijent.imeKlijenta}</td>
                            <td className="sredina">{klijent.pasmina}</td>
                            <td className="sredina">{klijent.napomena}</td>
                            <td className="sredina">{klijent.imeVlasnika}</td>
                            <td className="sredina">{klijent.prezimeVlasnika}</td>
                            <td className="sredina">{klijent.telefon}</td>
                            <td className="sredina">{klijent.eposta}</td>
                            <td className="sredina">{klijent.statusiRezervacija}</td>
                            <td className="sredina">
                                <Button 
                                variant=""
                                onClick={()=>{navigate(`/klijenti/${klijent.sifra}`)}}>
                                    <CiEdit size={25} />
                                </Button>
                                &nbsp; &nbsp; &nbsp; 
                                <Button
                                    variant="danger"
                                    onClick={() => obrisiKlijenta(klijent.sifra)}
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