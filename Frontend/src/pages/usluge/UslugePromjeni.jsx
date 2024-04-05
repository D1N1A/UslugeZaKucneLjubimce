import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UslugaService from "../../services/UslugaService";

export default function UslugePromjeni() {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [usluga, setUsluga] = useState({});

    async function dohvatiUslugu() {
        await UslugaService.getBySifra(routeParams.sifra)
            .then((res) => {
                setUsluga(res.data);
            })
            .catch((e) => {
                alert(e.poruka);
            });
    }

    useEffect(() => {
        dohvatiUslugu();
    }, []);

    async function promjeniUslugu(usluga) {
        const odgovor = await UslugaService.promjeni(routeParams.sifra, usluga);
        if (odgovor.ok) {
            navigate(RoutesNames.USLUGE_PREGLED);
        } else {
            console.log(odgovor);
            alert(odgovor.poruka);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        const usluga = {
            naziv: podaci.get("naziv"),
        };

        promjeniUslugu(usluga);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control
                        type="text"
                        name="naziv"
                        defaultValue={usluga.naziv}
                    />
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
                            Promjeni uslugu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
