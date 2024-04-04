import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";
import { RoutesNames } from "../../constants";

export default function PruzateljiUslugaPromijeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [pruzateljusluge, setPruzateljUsluge] = useState({});


    useEffect(() => {
        dohvatiPruzateljUsluge();
    }, []);

    async function dohvatiPruzateljUsluge() {
        try {
            const response = await PruzateljUslugeService.getBySifra(routeParams.sifra);
            if (response.status === 200) {
                setPruzateljUsluge(response.data);
            } else {
                console.error(response);
                alert("Došlo je do pogreške prilikom dohvaćanja podataka.");
            }
        } catch (error) {
            console.error(error);
            alert("Došlo je do pogreške prilikom dohvaćanja podataka.");
        }
    }

    async function promijeniPruzateljUsluge() {
        try {
            const response = await PruzateljUslugeService.promijeniPruzateljUsluge(routeParams.sifra, pruzateljusluge);
            if (response.status === 200) {
                navigate(RoutesNames.PRUZATELJIUSLUGA_PREGLED);
            } else {
                console.error(response);
                alert("Došlo je do pogreške prilikom promjene statusa rezervacije.");
            }
        } catch (error) {
            console.error(error);
            alert("Došlo je do pogreške prilikom promjene statusa rezervacije.");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        promijeniPruzateljUsluge();
    }


    function handleInputChange(e) {
        const { name, value } = e.target;
        setPruzateljUsluge(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.ime || ''}
                        name="ime"
                        onChange={handleInputChange}
                        placeholder="Unesite ime"
                    />
                </Form.Group>
                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.prezime || ''}
                        name="prezime"
                        onChange={handleInputChange}
                        placeholder="Unesite prezime"
                    />
                </Form.Group>
                <Form.Group controlId="usluga">
                    <Form.Label>Usluga</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.usluga || ''}
                        name="usluga"
                        onChange={handleInputChange}
                        placeholder="Unesite uslugu"
                    />
                </Form.Group>
                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.telefon || ''}
                        name="telefon"
                        onChange={handleInputChange}
                        placeholder="Unesite broj telefona"
                    />
                </Form.Group>
                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.adresa || ''}
                        name="adresa"
                        onChange={handleInputChange}
                        placeholder="Unesite adresu"
                    />
                </Form.Group>
                <Form.Group controlId="eposta">
                    <Form.Label>ePošta</Form.Label>
                    <Form.Control
                        type="text"
                        value={pruzateljusluge.eposta || ''}
                        name="eposta"
                        onChange={handleInputChange}
                        placeholder="Unesite adresu ePošte"
                    />
                </Form.Group>
                
                <Row className="Akcije">
                    <Col>
                        <Link className="btn btn-danger" to={RoutesNames.PRUZATELJIUSLUGA_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Promijeni podatke</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}