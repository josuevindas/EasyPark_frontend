import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Layout } from './components/Layout.jsx';
import ParkAdm from './ParkAdm/ParkAdm'; // ✅ Importación corregida

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<ParkAdm />} />   {/* ✅ Ahora muestra ParkAdm */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
