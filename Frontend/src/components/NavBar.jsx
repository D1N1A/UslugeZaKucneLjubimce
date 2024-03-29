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
              <NavDropdown.Item href="#action/3.1">Usluge</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Pružatelji usluga
              </NavDropdown.Item>
              {/* Koristite onClick za programsku navigaciju */}
              <NavDropdown.Item onClick={() => navigate(RoutesNames.STATUSIREZERVACIJA_PREGLED)}>
                Statusi rezervacija
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
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