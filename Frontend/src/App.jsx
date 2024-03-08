import  { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"

function App () {
  return (
    <>
      <NavBar />
      <Routes>
        <>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        </>
      </Routes>
    </>
  )
}

export default App