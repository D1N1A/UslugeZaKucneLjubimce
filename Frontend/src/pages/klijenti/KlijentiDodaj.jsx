import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";
import UslugaService from "../../services/UslugaService";
import KlijentService from "../../services/KlijentService";

export default function KlijentiDodaj() {
    const navigate = useNavigate();

    const [klijenti, setKlijenti] = useState([]);
    const [uslugaSifra, setUslugaSifra] = useState(0);
    const [pruzateljiUsluga, setPruzateljiUsluga] = useState([]);
    const [statusiRezervacija, setStatusiRezervacija] = useState([]);
    const [statusiRezervacijaSifra, setStatusiRezervacijaSifra] = useState(0);

    useEffect(() => {
        async function fetchData() {
            await dohvatiKlijente();
            await dohvatiPruzateljeUsluge();
            await dohvatiStatusiRezervacija();
        }
        fetchData();
    }, []);

    async function dohvatiKlijente() {
        await KlijentService.get()
            .then((response) => {
                setKlijenti(response.data);
                setUslugaSifra(response.data[0].sifra);
            })
            .catch((error) => console.log(error));
    }

    async function dohvatiPruzateljeUsluge() {
        await PruzateljUslugeService.get()
            .then((response) => {
                setPruzateljiUsluga(response.data);
            })
            .catch((error) => console.log(error));
    }

    async function dohvatiStatusiRezervacija() {
        // Fetch statusiRezervacija data
    }

    async function dodajKlijenta(e) {
        const odgovor = await KlijentService.dodaj(e);
        if (odgovor.ok) {
            navigate(RoutesNames.KLIJENTI_PREGLED);
        } else {
            alert(odgovor.poruka.errors);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const klijent = {
            uslugaSifra: parseInt(uslugaSifra),
            pruzateljusluge: parseInt(podaci.get('pruzateljUsluge')),
            imeKlijenta: podaci.get('imeKlijenta'),
            pasmina: podaci.get('pasmina'),
            napomena: podaci.get('napomena'),
            imeVlasnika: podaci.get('imeVlasnika'),
            prezimeVlasnika: podaci.get('prezimeVlasnika'),
            telefon: podaci.get('telefon'),
            eposta: podaci.get('eposta'), 
            statusiRezervacija: parseInt(statusiRezervacijaSifra)      
        };

        dodajKlijenta(klijent);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="usluga">
                    <Form.Label>Usluga</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            setUslugaSifra(e.target.value);
                        }}
                    >
                        {klijenti &&
                            klijenti.map((klijent, index) => (
                                <option key={index} value={klijent.sifra}>
                                    {klijent.naziv}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pruzateljUsluge">
                    <Form.Label>Pružatelj usluge</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            // Handle onChange event for pruzateljUsluge
                        }}
                    >
                        {pruzateljiUsluga &&
                            pruzateljiUsluga.map((pruzateljUsluge, index) => (
                                <option key={index} value={pruzateljUsluge.sifra}>
                                    {pruzateljUsluge.ime}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                {/* Other form fields */}
                <Row className="Akcije">
                    <Col>
                        <Link className="btn btn-danger" to={RoutesNames.PRUZATELJIUSLUGA_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Dodaj klijenta</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}