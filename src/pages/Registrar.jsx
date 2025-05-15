import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Registrar.css'; 
import '../assets/css/Modal.css';
import { Alert, Confirm } from "../components/ModalAlert";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Preguntar Josue",
  authDomain: "Preguntar Josue"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const Registrar = () => {
  // Estados para los datos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuarios, setTipoUsuarios] = useState('');
  const [telefono, setTelefono] = useState('');
const [alertCustom, setAlertCustom] = useState({ type: '', message: '' });

  const navigate = useNavigate();
    const resetFormulario = () => {
      setNombre("");
      setEmail("");
      setPassword("");
      setTipoUsuarios('');
      setTelefono("");
      
    };

     useEffect(() => {
        
        const token = localStorage.getItem("easypark_token");
        if (!token) {
          navigate("/");
        }
      }, []); 
 const handleRegistrar = async (e) => {
    e.preventDefault()
  
  

  // Validaciones condicionales según visibilidad
  const errores = [];

  if (!nombre) errores.push('Nombre es requerido.');
  if (!email.trim()) errores.push('Email es requerida.');
  if (!password.trim()) errores.push('Precio es requerido.');
  if (!tipoUsuarios) errores.push('Tipo de usuario es requerido.');
  if (!telefono.trim()) errores.push('Teléfono es requerido.');
  if (errores.length > 0) {
    setAlertCustom({ type: 'error', message: errores.join(' ') });
    return;
  }

    try {
      const response = await fetch('http://localhost:3001/api/registro/registrar', {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
        body: JSON.stringify({nombre,
      email,
      password,
      tipo_usuarios: tipoUsuarios,
      telefono,
      fecha_registro: new Date().toISOString() })
      });
 const result = await response.json();

    if (response.ok) {
      setAlertCustom({ type: 'success', message: 'Ursuario registrado con éxito' });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();  
      localStorage.setItem('easypark_token', token);
       resetFormulario();
       
      // Redirigir según el tipo de usuario

      if (tipoUsuarios === 'adminp' || tipoUsuarios === 'propietariop') {
           
           
            navigate('/Pendiente');
        
      }else if (tipoUsuarios === 'cliente') {
        
      }
       
    } else {
      setAlertCustom({ type: 'error', message: result.error || 'No se pudo registrar' });
    }
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    setAlertCustom({ type: 'error', message: 'Error de red' });
  }
  };
 const handleCloseAlert = () => {
    setAlertCustom({ type: '', message: '' });
  };
  return (
   
    <div className="content-box mx-auto p-4 shadow rounded bg-white bg-opacity-75">
      <h1>Registro de Usuario</h1>
       <div className="form-group text-center">
  <img
    src="/src/assets/img/logo-easyPark.jpeg"
    alt="Logo"
    className="logo"
    style={{ maxWidth: '30%', height: 'auto' }}
  />
</div>

      <form onSubmit={handleRegistrar}>
        
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" autoComplete="nombre" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input type="email"  autoComplete="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" autoComplete="current-password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoUsuarios" className="form-label">Tipo de Usuario</label>
          <select className="form-select" id="tipoUsuarios" value={tipoUsuarios} onChange={(e) => setTipoUsuarios(e.target.value)} required>
            <option value="">Seleccionar tipo de usuario</option>
            <option value="cliente">Cliente</option>
            <option value="adminp">Administrador</option>
            <option value="propietariop">propietario</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Registrar Usuario</button>
      </form>
       <Alert type={alertCustom.type} message={alertCustom.message} onClose={handleCloseAlert} />
    </div>
  );
};


