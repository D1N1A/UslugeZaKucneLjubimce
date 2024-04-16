import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import PruzateljUslugeService from "../../services/PruzateljUslugeService";
import StatusRezervacijeService from "../../services/StatusRezervacijeService";
import KlijentService from "../../services/KlijentService";

export default function KlijentiPromjeni() {
    const navigate = useNavigate();
    const routeParams = useParams();

    const [pruzateljiUsluga, setPruzateljiUsluga] = useState([]);
    const [pruzateljUslugeSifra, setPruzateljUslugeSifra] = useState(0);
    const [statusiRezervacija, setStatusiRezervacija] = useState([]);
    const [statusRezervacijeSifra, setStatusRezervacijeSifra] = useState(0);
    const [klijent, setKlijent] = useState({});

    // async function dohvatiKlijent() {
    //     const odgovor = await KlijentService.getBySifra(routeParams.sifra)
    //     if (!odgovor.ok) {
    //         alert(odgovor.podaci);
    //         return;
    //     }
    //     let klijent = odgovor.podaci;

    //     setKlijent(klijent);
    //     setPruzateljUslugeSifra(klijent.pruzateljSifra);
    //     setStatusRezervacijeSifra(klijent.statusSifra);
    // }


    async function dohvatiKlijenta() {
        try {
            const odgovor = await KlijentService.getBySifra(routeParams.sifra);
            const klijentData = odgovor.data;
            console.log(klijentData);
            setPruzateljUslugeSifra(klijentData.pruzateljSifra);
            setStatusRezervacijeSifra(klijentData.statusSifra);
            setKlijent(klijentData);
        } catch (error) {
            alert(error.poruka)
        }
    }

    async function dohvatiPruzateljeUsluga() {
        await PruzateljUslugeService.get()
            .then((response) => {
                setPruzateljiUsluga(response.data);

            })
            .catch((error) => console.log(error));
    }

    async function dohvatiStatuseRezervacija() {
        await StatusRezervacijeService.getStatusiRezervacija()
            .then((response) => {
                setStatusiRezervacija(response.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchInitialData();
    }, []);

    async function fetchInitialData() {
        await dohvatiPruzateljeUsluga();
        await dohvatiStatuseRezervacija();
        await dohvatiKlijenta();
        // await dohvatiKlijent();
    }

    async function promjeni(e) {
        const odgovor = await KlijentService.promjeni(routeParams.sifra, e);
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
            // pruzateljSifra: parseInt(podaci.get("pruzateljUslugeSifra")),
            imeklijenta: podaci.get('imeklijenta'),
            pasmina: podaci.get('pasmina'),
            napomena: podaci.get('napomena'),
            imevlasnika: podaci.get('imevlasnika'),
            prezimevlasnika: podaci.get('prezimevlasnika'),
            telefon: podaci.get('telefon'),
            eposta: podaci.get('eposta'),
            statusSifra: parseInt(statusRezervacijeSifra)
            // statusSifra: parseInt(podaci.get("statusRezervacijeSifra"))
        };

        promjeni(klijent);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="pruzateljUsluge">
                            <Form.Label>Pružatelj usluge</Form.Label>
                            <Form.Select
                                value={pruzateljUslugeSifra}
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
                                name="imeklijenta"

                                defaultValue={klijent.imeklijenta}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="pasmina">
                            <Form.Label>Pasmina</Form.Label>
                            <Form.Control
                                type="text"
                                name="pasmina"
                                defaultValue={klijent.pasmina}
                            />
                        </Form.Group>
                        <Form.Group controlId="napomena">
                            <Form.Label>Napomena</Form.Label>
                            <Form.Control
                                type="text"
                                name="napomena"
                                defaultValue={klijent.napomena}
                            />
                        </Form.Group></Col><Col><Form.Group controlId="imevlasnika">
                            <Form.Label>Ime vlasnika</Form.Label>
                            <Form.Control
                                type="text"
                                name="imevlasnika"
                                defaultValue={klijent.imevlasnika}
                            />
                        </Form.Group>
                        <Form.Group controlId="prezimevlasnika">
                            <Form.Label>Prezime vlasnika</Form.Label>
                            <Form.Control
                                type="text"
                                name="prezimevlasnika"
                                defaultValue={klijent.prezimevlasnika}
                            />
                        </Form.Group>
                        <Form.Group controlId="telefon">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefon"
                                defaultValue={klijent.telefon}
                            />
                        </Form.Group>
                        <Form.Group controlId="eposta">
                            <Form.Label>ePošta</Form.Label>
                            <Form.Control
                                type="text"
                                name="eposta"
                                defaultValue={klijent.eposta}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="statusrezervacije">
                            <Form.Label>Status Rezervacije</Form.Label>
                            <Form.Select
                                value={statusRezervacijeSifra}
                                onChange={(e) => {
                                    setStatusRezervacijeSifra(e.target.value);
                                }}
                            >
                                {statusiRezervacija &&
                                    statusiRezervacija.map((statusRezervacije, index) => (
                                        <option key={index} value={statusRezervacije.sifra}>
                                            {statusRezervacije.statusNaziv}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="Akcije">
                    <Col>
                        <Link className="btn btn-danger" to={RoutesNames.KLIJENTI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Unesi promjenu</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}