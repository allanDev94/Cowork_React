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
    duracion: "",
  });

  // Resetea el formulario del modal
  useEffect(() => {
    if (espacio) {
      setForm({
        nombre: "",
        telefono: "",
        email: user?.email || "",
        fecha: "",
        hora: "",
        duracion: "",
      });
    }
  }, [espacio]);

  const horas = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const today = new Date().toLocaleDateString("sv-SE");
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0") + ":00";
  const horaCierre = "18:00";

  const horasDisponibles =
    form.fecha === today ? horas.filter((h) => h >= currentHour) : horas;

  const duracionesDisponibles = () => {
    if (!form.hora) return [];

    const opciones = [];

    const horaInicio = parseInt(form.hora.split(":")[0]);

    // siempre puede intentar 1 hora
    if (horaInicio + 1 <= 18) {
      opciones.push(1);
    }

    // máximo 2 horas
    if (horaInicio + 2 <= 18) {
      opciones.push(2);
    }

    return opciones;
  };

  const obtenerHoraFin = () => {
    if (!form.hora || !form.duracion) return "";

    const [horaStr] = form.hora.split(":");
    const horaInicio = Number(horaStr);

    const fin = horaInicio + Number(form.duracion);
    if (fin > 18) return "Fuera de horario";

    return `${fin.toString().padStart(2, "0")}:00`;
  };

  if (!espacio) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "fecha" && { hora: "", duracion: "" }),
      ...(name === "hora" && { duracion: "" }),
    }));
  };

  const handleSubmit = () => {
    const { nombre, telefono, email, fecha, hora, duracion } = form;

    const today = new Date().toLocaleDateString("sv-SE");

    if (fecha < today) {
      alert("No puedes reservar una fecha anterior a hoy");
      return;
    }

    if (!nombre || !telefono || !email || !fecha || !hora) {
      alert("Completa todos los campos");
      return;
    }

    if (!duracion) {
      alert("Selecciona la duración");
      return;
    }

    const horaIndex = horas.indexOf(hora);
    const horaFin = horas[horaIndex + Number(duracion)];

    crearReserva({
      ...form,
      horaFin,
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
            <h5 className="modal-title">Reservar: {espacio.nombre}</h5>
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
              min={today}
              value={form.fecha}
              onChange={handleChange}
            />

            <select
              name="hora"
              className="form-control"
              value={form.hora}
              onChange={handleChange}
            >
              <option value="">Selecciona una hora</option>

              {horasDisponibles.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <select
              name="duracion"
              className="form-control mt-2"
              value={form.duracion}
              onChange={handleChange}
              disabled={!form.hora}
            >
              <option value="">Duración</option>

              {duracionesDisponibles().map((d) => (
                <option key={d} value={d}>
                  {d} hora{d > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            {form.hora && form.duracion && (
              <div className="mt-2 alert alert-info">
                ⏱️ Reserva: {form.hora} - {obtenerHoraFin()} ({form.duracion}h)
              </div>
            )}
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
