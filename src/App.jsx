import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Login } from './pages/Login'
import  {Layout}  from './components/Layout.jsx'
import { ReservePage } from './pages/ReservePage'

function App() {

  return (
    <div>
      <Layout>
        <Routes>
          {/* Usamos `element` para pasar el componente que se renderiza */}
          <Route path="/" element={<Login />} />
          <Route path="/buscar" element={<ReservePage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
