// ComentariosPage.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const Comentario= () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);

  const buscar = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/estacionamientos?nombre=${busqueda}`);
    const data = await res.json();
    setResultados(data);
  };

  const enviarComentario = async () => {
  const usuarioId = localStorage.getItem("iduser");
  const token = localStorage.getItem("token"); // Asegúrate que esté guardado al iniciar sesión

  const body = {
    usuario_id: usuarioId,
    estacionamiento_id: seleccionado.id,
    puntuacion,
    comentario,
    fecha: new Date(),
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Aquí se envía el token
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al enviar comentario");

    alert("Comentario enviado");
    setMostrarModal(false);
    setComentario("");
    setPuntuacion(0);
  } catch (err) {
    console.error(err);
    alert("Hubo un error al enviar el comentario.");
  }
};


  return (
    <div className="container mt-4">
      <h3>Buscar Estacionamiento</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nombre del estacionamiento"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Button onClick={buscar}>Buscar</Button>

      <ul className="list-group mt-3">
        {resultados.map((est) => (
          <li
            key={est.id}
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSeleccionado(est);
              setMostrarModal(true);
            }}
          >
            {est.nombre}
          </li>
        ))}
      </ul>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar comentario a {seleccionado?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Puntuación</Form.Label>
            <Form.Select value={puntuacion} onChange={(e) => setPuntuacion(parseInt(e.target.value))}>
              <option value={0}>Selecciona</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} estrella{n > 1 && "s"}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={enviarComentario}>Enviar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
