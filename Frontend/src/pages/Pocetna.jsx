import { Col, Container, Row } from 'react-bootstrap';
import Image from "../assets/moj.jpg";

export default function Pocetna() {

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                    <p className='sredina' style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        backgroundImage: 'linear-gradient(to right, #ff8c00, #ff8000)', /* Prilagodite boju ovdje */
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Dobrodošli na Usluge za kućne ljubimce aplikaciju
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center">
                    <img
                        src={Image}
                        alt="ljubimac"
                        style={{ maxWidth: '600px' }} />
                </Col>
            </Row>
        </Container>
    );
}