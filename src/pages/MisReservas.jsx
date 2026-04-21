import { useState, useEffect } from "react";
import { getReservasByEmail } from "../services/reservaService";
import ReservaCard from "../components/ReservaCard";

const TABS = [
  { key: "historial", label: "Historial" },
  { key: "activa", label: "Activas" },
  { key: "cancelada", label: "Canceladas" },
];

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [tabActiva, setTabActiva] = useState("historial");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const cargarReservas = () => {
    if (!user?.email) return;
    const data = getReservasByEmail(user.email);
    setReservas(data);
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const reservasFiltradas =
    tabActiva === "historial"
      ? reservas
      : reservas.filter((r) => r.estado === tabActiva);

  return (
    <section className="espacios-section">
      <div className="container ">

        <div className="text-center mb-4 titulo-espacios">
          <h2 className="display-5 fw-bold text-light">Mis Reservas</h2>
          <hr className="border-light opacity-50" />
          <h3 className="text-white">
            Revisa el estado de tus reservas
          </h3>
        </div>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4">
          {TABS.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link ${tabActiva === tab.key ? "active" : "text-light"}`}
                onClick={() => setTabActiva(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CONTENIDO */}
        {reservasFiltradas.length === 0 ? (
          <p className="text-white text-center">No hay reservas en esta sección.</p>
        ) : (
          <div className="row g-4">
            {reservasFiltradas.map((reserva) => (
              <div className="col-10 col-sm-6 col-lg-6" key={reserva.id}>
                <ReservaCard
                  reserva={reserva}
                  onActualizar={cargarReservas}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MisReservas;
