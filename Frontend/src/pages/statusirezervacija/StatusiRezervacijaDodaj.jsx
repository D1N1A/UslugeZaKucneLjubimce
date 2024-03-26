import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import StatusRezervacijeService from "../../services/StatusRezervacijeService";

export default function StatusiRezervacijaDodaj() {
    const navigate = useNavigate();
    const [stanje, setStanje] = useState(""); 
    const [pokazatelj, setPokazatelj] = useState("gray"); 

    async function dodajStatusRezervacije(statusrezervacije) {
        const odgovor = await StatusRezervacijeService.dodajStatusRezervacije(statusrezervacije);
        if (odgovor.ok) {
            navigate(RoutesNames.STATUSIREZERVACIJA_PREGLED);
        } else {
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);
        const statusrezervacije = {
            stanje: podaci.get('stanje'),
            pokazatelj: pokazatelj === 'gray' ? null : pokazatelj === 'green'
        };

            dodajStatusRezervacije(statusrezervacije);
    }

    function handleRadioChange(e) {
        setPokazatelj(e.target.value);
    }

    function handleInputChange(e) {
        setStanje(e.target.value);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="stanje">
                    <Form.Label>Stanje</Form.Label>
                    <Form.Control
                        type="text"
                        name="stanje"
                        onChange={handleInputChange}
                        placeholder="Unesite stanje"
                    />
                </Form.Group>
                <Form.Group controlId="pokazatelj">
                    <Form.Check
                        type="radio"
                        label={<GrValidate color="green" size={25} />}
                        value="green"
                        checked={pokazatelj === "green"}
                        onChange={handleRadioChange}
                    />
                    <Form.Check
                        type="radio"
                        label={<GrValidate color="gray" size={25} />}
                        value="gray"
                        checked={pokazatelj === "gray"}
                        onChange={handleRadioChange}
                    />
                    <Form.Check
                        type="radio"
                        label={<GrValidate color="red" size={25} />}
                        value="red"
                        checked={pokazatelj === "red"}
                        onChange={handleRadioChange}
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