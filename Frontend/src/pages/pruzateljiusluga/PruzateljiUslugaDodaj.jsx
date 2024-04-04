import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";

export default function PruzateljiUslugaDodaj() {
    const navigate = useNavigate();
    const [pruzateljusluge, setPruzateljUsluge] = useState(); 

    async function dodajPruzateljUsluge(pruzateljusluge) {
        const odgovor = await PruzateljUslugeService.dodajPruzateljUsluge(pruzateljusluge);
        if (odgovor.ok) {
            navigate(RoutesNames.PRUZATELJIUSLUGA_PREGLED);
        } else {
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        const statusrezervacije = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            usluga: podaci.get('usluga'),
            telefon: podaci.get('telefon'),
            adresa: podaci.get('adresa'),
            eposta: podaci.get('eposta')      
        };

        dodajPruzateljUsluge(statusrezervacije);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                        placeholder="Unesite ime"
                    />
                </Form.Group>
                <Form.Group controlId="Prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                        placeholder="Unesite prezime"
                    />
                </Form.Group>
                <Form.Group controlId="Usluga">
                    <Form.Label>Usluga</Form.Label>
                    <Form.Control
                        type="text"
                        name="usluga"
                        placeholder="Unesite uslugu"
                    />
                </Form.Group>
                <Form.Group controlId="Telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefon"
                        placeholder="Unesite telefon"
                    />
                </Form.Group>
                <Form.Group controlId="Adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type="text"
                        name="adresa"
                        placeholder="Unesite adresu"
                    />
                </Form.Group>
                <Form.Group controlId="eposta">
                    <Form.Label>ePošta</Form.Label>
                    <Form.Control
                        type="text"
                        name="eposta"
                        placeholder="Unesite ePoštu"
                    />
                </Form.Group>
                
                <Row className="Akcije">
                    <Col>
                        <Link className="btn btn-danger" to={RoutesNames.STATUSIREZERVACIJA_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Dodaj smjer</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}