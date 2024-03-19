import React from "react";
import { Container, Form } from "react-bootstrap";

export default function StatusiRezervacijaDodaj() {
    function handleSubmit(e) {
        e.preventDefault();
        // Ovdje možete dodati logiku za obradu podataka iz forme
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="pokazatelj">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        name="pokazatelj"
                        placeholder="Unesite naziv"
                    />
                </Form.Group>
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </Form>
        </Container>
    );
}