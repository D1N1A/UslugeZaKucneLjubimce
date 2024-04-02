import  { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import StatusiRezervacija from "./pages/statusirezervacija/StatusiRezervacija"
import StatusiRezervacijaDodaj from "./pages/statusirezervacija/StatusiRezervacijaDodaj" 
import StatusiRezervacijaPromijeni from "./pages/statusirezervacija/StatusiRezervacijaPromijeni"





function App () {
  return (
    <>
      <NavBar />
      <Routes>
        <>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_PREGLED} element={<StatusiRezervacija />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_NOVI} element={<StatusiRezervacijaDodaj />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_PROMIJENI} element={<StatusiRezervacijaPromijeni />} />
        </>
      </Routes>
    </>
  )
}

export default App