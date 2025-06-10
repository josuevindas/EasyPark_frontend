// ModalAcuerdo.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalAcuerdo = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Acuerdo de Usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-justify text-dark">
      <p className="text-black">Al utilizar la aplicación EasyPark, aceptas los siguientes términos:</p>
      <ul>
        <li className="text-black">Aceptas proporcionar información veraz durante el registro.</li>
        <li className="text-black">Eres responsable del uso de tu cuenta y de mantener tu contraseña segura.</li>
        <li className="text-black">El uso del servicio está sujeto a las normas de tránsito y uso de parqueo locales.</li>
        <li className="text-black">EasyPark no se hace responsable por pérdidas, robos o daños en parqueos registrados o informales.</li>
        <li className="text-black">Tu cuenta puede ser suspendida si incumples los términos.</li>
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);