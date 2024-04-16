import  { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// import StatusiRezervacija from "./pages/statusirezervacija/StatusiRezervacija"
// import StatusiRezervacijaDodaj from "./pages/statusirezervacija/StatusiRezervacijaDodaj" 
// import StatusiRezervacijaPromijeni from "./pages/statusirezervacija/StatusiRezervacijaPromijeni"

import Usluge from "./pages/usluge/Usluge"
import UslugeDodaj from "./pages/usluge/UslugeDodaj"
import UslugePromjeni from "./pages/usluge/UslugePromjeni"

import PruzateljiUsluga from "./pages/pruzateljiusluga/PruzateljiUsluga"
import PruzateljiUslugaDodaj from "./pages/pruzateljiusluga/PruzateljiUslugaDodaj"
import PruzateljiUslugaPromijeni from "./pages/pruzateljiusluga/PruzateljiUslugaPromijeni"

import Klijenti from "./pages/klijenti/Klijenti"
import KlijentiDodaj from "./pages/klijenti/KlijentiDodaj"






function App () {
  return (
    <>
      <NavBar />
      <Routes>
        <>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        {/* <Route path={RoutesNames.STATUSIREZERVACIJA_PREGLED} element={<StatusiRezervacija />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_NOVI} element={<StatusiRezervacijaDodaj />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_PROMIJENI} element={<StatusiRezervacijaPromijeni />} /> */}

        <Route path={RoutesNames.USLUGE_PREGLED} element={<Usluge />} />
        <Route path={RoutesNames.USLUGE_NOVI} element={<UslugeDodaj />} />
        <Route path={RoutesNames.USLUGE_PROMJENI} element={<UslugePromjeni />} />

        <Route path={RoutesNames.PRUZATELJIUSLUGA_PREGLED} element={<PruzateljiUsluga />} />
        <Route path={RoutesNames.PRUZATELJIUSLUGA_NOVI} element={<PruzateljiUslugaDodaj />} />
        <Route path={RoutesNames.PRUZATELJIUSLUGA_PROMIJENI} element={<PruzateljiUslugaPromijeni />} />

        <Route path={RoutesNames.KLIJENTI_PREGLED} element={<Klijenti />} />
        <Route path={RoutesNames.KLIJENTI_NOVI} element={<KlijentiDodaj />} />
        {/* <Route path={RoutesNames.KLIJENTI_PROMIJENI} element={<KlijentiPromijeni />} /> */}
        
        </>
      </Routes>
    </>
  )
}

export default App