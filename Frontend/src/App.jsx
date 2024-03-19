import  { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import StatusiRezervacija from "./pages/statusirezervacija/StatusiRezervacija"
import StatusiRezervacijaDodaj from "./pages/statusirezervacija/StatusiRezervacijaDodaj" 





function App () {
  return (
    <>
      <NavBar />
      <Routes>
        <>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_PREGLED} element={<StatusiRezervacija />} />
        <Route path={RoutesNames.STATUSIREZERVACIJA_NOVI} element={<StatusiRezervacijaDodaj />} />
        </>
      </Routes>
    </>
  )
}

export default App