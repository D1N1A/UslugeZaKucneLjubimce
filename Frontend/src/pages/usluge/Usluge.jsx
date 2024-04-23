import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { TiDocumentAdd } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UslugaService from "../../services/UslugaService";
import { RoutesNames } from "../../constants";
import useLoading from "../../hooks/useLoading";

export default function Usluge() {
    const [usluge, setUsluge] = useState();
    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function dohvatiUsluge() {
        showLoading();
        await UslugaService.get()
            .then((res) => {
                console.log(res.data);
                hideLoading();
                setUsluge(res.data);
            })
            .catch((e) => {
                hideLoading();
                alert(e);
            });
    }

    useEffect(() => {
        dohvatiUsluge();
    }, []);

    async function obrisiUslugu(sifra) {
        const odgovor = await UslugaService.obrisi(sifra);
        if (odgovor.ok) {
            alert(odgovor.poruka.data);
            dohvatiUsluge();
        }
    }

    return (
        <Container>
            <Link to={RoutesNames.USLUGE_NOVI} className="btn btn-success gumb">
                <TiDocumentAdd size={25} /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="sredina">Naziv</th>
                        <th className="sredina">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {usluge &&
                        usluge.map((usluga, index) => (
                            <tr key={index}>
                                <td className="sredina">{usluga.naziv}</td>
                                <td className="sredina">
                                    <Button
                                        variant=""
                                        onClick={() => {
                                            navigate(`/usluge/${usluga.sifra}`);
                                        }}
                                    >
                                        <CiEdit size={25} />
                                    </Button>
                                    &nbsp; &nbsp; &nbsp;
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            obrisiUslugu(usluga.sifra)
                                        }
                                    >
                                        <MdDelete size={25} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
}
