// src/pages/EditarPropiedad.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from '../components/ModalAlert'; // Ajusta la ruta si es distinta

export const EditarPropiedad = () => {
  const { id, tipo } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    latitud: '',
    longitud: '',
    disponibilidad: '',
    horario: '',
    anchura: '',
    altura: ''
  });

  const [alertData, setAlertData] = useState({ type: '', message: '' });

  useEffect(() => {
    fetch(`http://localhost:3001/api/${tipo === 'Garaje' ? 'garajes' : 'estacionamientos'}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('easypark_token')}`
      }
    })
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(err => {
        console.error("Error al cargar:", err);
        setAlertData({ type: 'error', message: 'No se pudo cargar la propiedad' });
      });
  }, [id, tipo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    // Validar que ningún campo esté vacío
    for (let key in form) {
      if (!form[key].toString().trim()) {
        setAlertData({ type: 'warning', message: `El campo "${key}" no puede estar vacío` });
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:3001/api/${tipo === 'Garaje' ? 'garajes' : 'estacionamientos'}/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setAlertData({ type: 'success', message: 'Propiedad actualizada correctamente' });
        setTimeout(() => navigate('/MisPropiedades'), 2000);
      } else {
        setAlertData({ type: 'error', message: 'Error al actualizar la propiedad' });
      }
    } catch (err) {
      console.error("Error:", err);
      setAlertData({ type: 'error', message: 'Error al conectar con el servidor' });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar {tipo}</h2>
      <div className="row">
        {Object.keys(form).map((campo) => (
          <div key={campo} className="col-md-6 mb-3">
            <label className="form-label text-capitalize">{campo}</label>
            <input
              type="text"
              name={campo}
              value={form[campo] || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}
      </div>
      <button className="btn btn-success" onClick={handleGuardar}>Guardar Cambios</button>

      {/* Alerta */}
      <Alert
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ type: '', message: '' })}
      />
    </div>
  );
};
