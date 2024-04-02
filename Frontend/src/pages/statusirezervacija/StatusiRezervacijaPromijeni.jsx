import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrValidate } from "react-icons/gr"; 
import StatusRezervacijeService from "../../services/StatusRezervacijeService";
import { RoutesNames } from "../../constants";

export default function StatusiRezervacijaPromijeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [statusrezervacije, setStatusRezervacije] = useState({});
    const [pokazatelj, setPokazatelj] = useState(null);

    useEffect(() => {
        dohvatiStatusRezervacije();
    }, []);

    async function dohvatiStatusRezervacije() {
        try {
            const response = await StatusRezervacijeService.getBySifra(routeParams.sifra);
            if (response.status === 200) {
                setStatusRezervacije(response.data);
                setPokazatelj(response.data.pokazatelj);
            } else {
                console.error(response);
                alert("Došlo je do pogreške prilikom dohvaćanja podataka.");
            }
        } catch (error) {
            console.error(error);
            alert("Došlo je do pogreške prilikom dohvaćanja podataka.");
        }
    }

    async function promijeniStatusRezervacije() {
        try {
            const response = await StatusRezervacijeService.promijeniStatusRezervacije(routeParams.sifra, statusrezervacije);
            if (response.status === 200) {
                navigate(RoutesNames.STATUSIREZERVACIJA_PREGLED);
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
        promijeniStatusRezervacije();
    }

    function handleRadioChange(e) {
        const newValue = e.target.value;
        setPokazatelj(newValue);
        setStatusRezervacije(prevState => ({
            ...prevState,
            pokazatelj: newValue === 'green' ? true : newValue === 'gray' ? null : false
        }));
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setStatusRezervacije(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="stanje">
                    <Form.Label>Stanje</Form.Label>
                    <Form.Control
                        type="text"
                        value={statusrezervacije.stanje || ''}
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
                        <Button variant="primary" type="submit">Promijeni status</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}