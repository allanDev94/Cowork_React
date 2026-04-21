import { useState, useEffect } from "react";
import { crearReserva } from "../services/reservaService";

const ReservaModal = ({ espacio, onClose }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: user?.email || "",
    fecha: "",
    hora: "",
  }); 

  if (!espacio) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { nombre, telefono, email, fecha, hora } = form;

    if (!nombre || !telefono || !email || !fecha || !hora) {
      alert("Completa todos los campos");
      return;
    }

    crearReserva({
      ...form,
      espacioId: espacio.id,
      sala: espacio.nombre,
    });

    alert("Reserva creada ✅");
    onClose();
  };

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Reservar: {espacio.nombre}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {/* Sala bloqueada */}
            <input
              className="form-control mb-2"
              value={espacio.nombre}
              disabled
            />

            <input
              name="nombre"
              placeholder="Nombre"
              className="form-control mb-2"
              onChange={handleChange}
            />

            <input
              name="telefono"
              placeholder="Teléfono"
              className="form-control mb-2"
              onChange={handleChange}
            />

            <input
              name="email"
              className="form-control mb-2"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="date"
              name="fecha"
              className="form-control mb-2"
              onChange={handleChange}
            />

            <input
              type="time"
              name="hora"
              className="form-control"
              onChange={handleChange}
            />

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            <button className="btn btn-gold" onClick={handleSubmit}>
              Confirmar Reserva
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReservaModal;