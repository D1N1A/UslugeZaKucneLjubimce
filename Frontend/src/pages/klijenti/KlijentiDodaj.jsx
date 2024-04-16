import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";
import KlijentService from "../../services/KlijentService";

export default function KlijentiDodaj() {
    const navigate = useNavigate();

    const [pruzateljiUsluga, setPruzateljiUsluga] = useState([]);
    const [pruzateljUslugeSifra, setPruzateljUslugeSifra] = useState([]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    async function fetchInitialData() {
        await dohvatiPruzateljeUsluga();
    }

    async function dohvatiPruzateljeUsluga() {
        await PruzateljUslugeService.get()
            .then((response) => {
                setPruzateljiUsluga(response.data);
            })
            .catch((error) => console.log(error));
    }

    async function dodajKlijenta(e) {
        const odgovor = await KlijentService.dodaj(e);
        if (odgovor.ok) {
            navigate(RoutesNames.KLIJENTI_PREGLED);
            return;
        } else {
            alert(odgovor.poruka.errors);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const klijent = {
            pruzateljSifra: parseInt(pruzateljUslugeSifra),
            imeklijenta: podaci.get('imeklijenta'),
            pasmina: podaci.get('pasmina'),
            napomena: podaci.get('napomena'),
            imevlasnika: podaci.get('imeVlasnika'),
            prezimevlasnika: podaci.get('prezimeVlasnika'),
            telefon: podaci.get('telefon'),
            eposta: podaci.get('eposta'), 
            statusSifra: 1    
        };

        console.log("klijent: ", klijent);
        dodajKlijenta(klijent);
    }

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <Row>
            <Col>
            <Form.Group className="mb-3" controlId="pruzateljUsluge">
                    <Form.Label>Pružatelj usluge</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            setPruzateljUslugeSifra(e.target.value);
                        }}
                    >
                        {pruzateljiUsluga &&
                            pruzateljiUsluga.map((pruzateljUsluge, index) => (
                                <option key={index} value={pruzateljUsluge.sifra}>
                                    {pruzateljUsluge.ime} {pruzateljUsluge.prezime}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="imeklijenta">
                    <Form.Label>Ime klijenta</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="usluga">
                    <Form.Label>Pasmina</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                    />
                </Form.Group>
                <Form.Group controlId="telefon">
                    <Form.Label>Napomena</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefon"
                    />
                </Form.Group></Col><Col><Form.Group controlId="imevlasnika">
                    <Form.Label>Ime vlasnika</Form.Label>
                    <Form.Control
                        type="text"
                        name="imevlasnika"
                    />
                </Form.Group>
                <Form.Group controlId="prezimevlasnika">
                    <Form.Label>Prezime vlasnika</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezimevlasnika"
                    />
                </Form.Group>
                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefon"
                    />
                </Form.Group>
                <Form.Group controlId="eposta">
                    <Form.Label>ePošta</Form.Label>
                    <Form.Control
                        type="text"
                        name="eposta"
                    />
                </Form.Group></Col>
                </Row>
                
                
                <Row className="Akcije">
                    <Col>
                        <Link className="btn btn-danger" to={RoutesNames.KLIJENTI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Dodaj klijenta</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}