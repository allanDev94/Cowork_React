import { cancelarReserva } from "../services/reservaService";

const estadoBadge = {
  activa: { label: "Activa", clase: "badge bg-success" },
  cancelada: { label: "Cancelada", clase: "badge bg-danger" },
};

const ReservaCard = ({ reserva, onActualizar }) => {
  const badge = estadoBadge[reserva.estado] || {
    label: reserva.estado,
    clase: "badge bg-secondary",
  };

  const formatearFecha = (fecha) => {
    const [año, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${año}`;
  };

  const handleCancelar = () => {
    if (window.confirm("¿Cancelar esta reserva?")) {
      cancelarReserva(reserva.id);
      onActualizar();
    }
  };

  return (
    <div
      className="card shadow-sm border-0 h-100"
      style={{ minWidth: "220px" }}
    >
      <div className="card-body d-flex flex-column gap-2">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ flexWrap: "wrap", gap: "8px" }}
        >
          <h5 className="card-title mb-0">{reserva.sala}</h5>
          <span className={badge.clase}>{badge.label}</span>
        </div>

        <p className="mb-0 text-muted">
          <i className="bi bi-calendar3 me-1"></i>
          {formatearFecha(reserva.fecha)} — Hora: {reserva.hora}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-person me-1"></i>
          {reserva.nombre}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-envelope me-1"></i>
          {reserva.email}
        </p>

        <p className="mb-0 text-muted">
          <i className="bi bi-telephone me-1"></i>
          {reserva.telefono}
        </p>

        {reserva.estado === "activa" && (
          <button
            className="btn btn-outline-danger btn-sm mt-auto"
            onClick={handleCancelar}
          >
            Cancelar reserva
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservaCard;
