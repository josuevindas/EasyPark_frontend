import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Login } from './pages/Login'
import  {Layout}  from './components/Layout.jsx'
import { ReservePage } from './pages/ReservePage'
import { MapPage } from './pages/MapPage'
import   { ParkAdm }  from './pages/ParkAdm'
import{Registrar} from './pages/Registrar'
import { Pendiente} from './pages/pendiente.jsx'
import { AdmPendientes } from './pages/AdmPendientes.jsx' 
import {About} from './pages/Nosotros.jsx'
import {Home} from './pages/Home.jsx'
import {Bienvenida} from "./pages/Bienvenida";
import { MisPropiedades } from './pages/MisPropiedades.jsx'
import { EditarPropiedad } from './pages/EditarPropiedad.jsx';




function App() {

  return (
    <div>
      <Layout>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Bienvenida" element={<Bienvenida />} />
          <Route path="/About" element={<About />} />
          <Route path="/AdmPendientes" element={<AdmPendientes />} />
          <Route path="/MisPropiedades" element={<MisPropiedades />} />
          <Route path="/editarpropiedad/:id/:tipo" element={<EditarPropiedad />} />
          <Route path="/Pendiente" element={<Pendiente />} />
           <Route path="/Registrar" element={<Registrar />} />
          <Route path="/Adm" element={<ParkAdm />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/buscar" element={<ReservePage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
