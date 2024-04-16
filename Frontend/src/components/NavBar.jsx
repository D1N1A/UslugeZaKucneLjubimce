import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';

import './NavBar.css';

function NavBar() {
  // 
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav.Link onClick={() => navigate(RoutesNames.HOME)} className='linkPocetna'>
          <Navbar.Brand>
            Usluge za kućne ljubimce APP
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Izbornik" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate(RoutesNames.USLUGE_PREGLED)}>Usluge</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate(RoutesNames.PRUZATELJIUSLUGA_PREGLED)}>
                Pružatelji usluga
              </NavDropdown.Item>
              {}
              {/* <NavDropdown.Item onClick={() => navigate(RoutesNames.STATUSIREZERVACIJA_PREGLED)}>
                Statusi rezervacija
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=> navigate(RoutesNames.KLIJENTI_PREGLED)}>
                Klijenti
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;