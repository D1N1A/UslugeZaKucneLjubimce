import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import StatusRezervacijeService from "../../services/StatusRezervacijeService";

export default function StatusiRezervacija() {
    const [statusiRezervacija, setStatusiRezervacije] = useState([]);

    async function dohvatiStatuseRezervacija() {
        try {
            const res = await StatusRezervacijeService.getStatusiRezervacija();
            setStatusiRezervacije(res.data);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        dohvatiStatuseRezervacija();
    }, []);

    function stanje(statusrezervacije) {
        if (statusrezervacije.stanje == null) return "gray";
        if (statusrezervacije.stanje) return "green";
        return "red";
    }

    function pokazateljTitle(statusrezervacije) {
        if (statusrezervacije.pokazatelj == null) return 'Zahtjev na čekanju';
        if (statusrezervacije.pokazatelj) return 'Zahtjev obrađen';
        return 'Zahtjev u obradi';
    }

    return (
        <Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Stanje</th>
                        <th>Pokazatelj</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {statusiRezervacija && statusiRezervacija.map((statusrezervacije, index) => (
                        <tr key={index}>
                            <td>
                                <GrValidate
                                    color={stanje(statusrezervacije)}
                                    title={pokazateljTitle(statusrezervacije)}
                                />
                            </td>
                            <td>{statusrezervacije.pokazatelj}</td>
                            <td>Akcija</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}