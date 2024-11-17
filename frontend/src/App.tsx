import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Explore from "./pages/Explore/Explore"
import Home from "./pages/Home/Home"
import "./App.scss"
import { CreateUser } from "./pages/CreateUser"
import Header from "./Header/Header"
import Hamburger from "./Hamburger/Hamburger"
import Login from "./pages/Login/Login"
import { LoginManager } from "./Components/LoginManager/LoginManager"
/* import Admin from "./pages/Admin/Admin" */
import { AddPatient } from "./pages/AddPatient/AddPatient"
import { IndividualPatient } from "./pages/IndividualPatient/IndividualPatient"
import { UpdatePatient } from "./pages/UpdatePatient/UpdatePatient"
import PatientList from "./pages/UpdatePatient/PatientList"


function App() {
  return (
    <BrowserRouter>
      <LoginManager>
        <Header />
        <Hamburger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientlist" element={<PatientList />} />
          <Route path="/explore" element={<Explore />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/addpatient" element={<AddPatient />} />
          <Route path="/patient/:id" element={<IndividualPatient />} />
          <Route path="/updatepatient" element={<UpdatePatient />} /> 
        </Routes>
      </LoginManager>
    </BrowserRouter>
  )
}

export default App
