import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";
import UslugaService from "../../services/UslugaService";

export default function PruzateljiUslugaDodaj() {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [pruzateljUsluge, setPruzateljUsluge] = useState({});
    const [usluge, setUsluge] = useState([]);
    const [uslugaSifra, setUslugaSifra] = useState(0);

    async function dohvatiPruzateljaUsluge() {
        const odgovor = await PruzateljUslugeService.getBySifra(
            routeParams.sifra
        );

        if (!odgovor.ok) {
            alert(odgovor.podaci);
            return;
        }
        let pruzateljUsluge = odgovor.podaci;
        setPruzateljUsluge(pruzateljUsluge);
        setUslugaSifra(pruzateljUsluge.uslugaSifra);
    }

    async function dohvatiUsluge() {
        await UslugaService.get().then((odgovor) => {
            setUsluge(odgovor.data);
            setUslugaSifra(odgovor.data[0].sifra);
        });
    }

    async function ucitaj() {
        await dohvatiUsluge();
        await dohvatiPruzateljaUsluge();
    }

    useEffect(() => {
        ucitaj();
    }, []);

    async function promjeni(e) {
        const odgovor = await PruzateljUslugeService.promjeni(
            routeParams.sifra,
            e
        );
        if (odgovor.ok) {
            navigate(RoutesNames.PRUZATELJIUSLUGA_PREGLED);
        } else {
            alert(odgovor.poruka.errors);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const pruzateljUsluge = {
            ime: podaci.get("ime"),
            prezime: podaci.get("prezime"),
            uslugaSifra: parseInt(uslugaSifra),
            telefon: podaci.get("telefon"),
            adresa: podaci.get("adresa"),
            eposta: podaci.get("eposta"),
        };

        promjeni(pruzateljUsluge);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                        defaultValue={pruzateljUsluge.ime}
                    />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                        defaultValue={pruzateljUsluge.prezime}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="usluga">
                    <Form.Label>Usluga</Form.Label>
                    <Form.Select
                        value={uslugaSifra}
                        onChange={(e) => {
                            setUslugaSifra(e.target.value);
                        }}
                    >
                        {usluge &&
                            usluge.map((usluga, index) => (
                                <option key={index} value={usluga.sifra}>
                                    {usluga.naziv}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefon"
                        defaultValue={pruzateljUsluge.telefon}
                    />
                </Form.Group>
                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type="text"
                        name="adresa"
                        defaultValue={pruzateljUsluge.adresa}
                    />
                </Form.Group>
                <Form.Group controlId="eposta">
                    <Form.Label>ePošta</Form.Label>
                    <Form.Control
                        type="text"
                        name="eposta"
                        defaultValue={pruzateljUsluge.eposta}
                    />
                </Form.Group>

                <Row className="Akcije">
                    <Col>
                        <Link
                            className="btn btn-danger"
                            to={RoutesNames.PRUZATELJIUSLUGA_PREGLED}
                        >
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">
                            Promjeni pruzatelja usluge
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}