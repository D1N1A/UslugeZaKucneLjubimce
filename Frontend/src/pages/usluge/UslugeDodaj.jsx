import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, Route, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UslugaService from "../../services/UslugaService";

export default function UslugeDodaj() {
    const navigate = useNavigate();

    async function dodaj(pruzateljUsluge) {
        const response = await UslugaService.dodaj(pruzateljUsluge);
        if (response.ok) {
            navigate(RoutesNames.USLUGE_PREGLED);
            return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const pruzateljUsluge = {
            naziv: podaci.get("naziv"),
        };

        dodaj(pruzateljUsluge);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" />
                </Form.Group>
                <Row>
                    <Col>
                        <Link
                            className="btn btn-danger"
                            to={RoutesNames.USLUGE_PREGLED}
                        >
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">
                            Dodaj uslugu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
