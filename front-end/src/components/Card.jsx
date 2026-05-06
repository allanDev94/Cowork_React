const Card = ({ espacio, onReservar }) => {
  return (
    <div className="">
      <div className="card espacio-card h-100 shadow-sm border-0">
        {/* Imagen */}
        <div className="card-img-container">
          <img
            src={espacio.imagen}
            className="card-img-top"
            alt={espacio.nombre}
          />

          {/* Badge flotante */}
          <span
            className={`badge-custom ${
              espacio.estado === "completo" ? "badge-danger" : "badge-gold"
            }`}
          >
            {espacio.estado === "completo" ? "No disponible" : "Disponible"}
          </span>
        </div>

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center mb-2">{espacio.nombre}</h5>

<<<<<<< HEAD:front-end/src/components/Card.jsx
          <h5 className="card-title text-center mb-2">
            {espacio.nombre}
          </h5>
          
          <p className="card-desc">
            {espacio.descripcion}
          </p>
=======
          <p className="card-desc">{espacio.descripcion}...</p>
>>>>>>> 87120a61bc7b2e8dfd792838b34ec06fe8c5d616:src/components/Card.jsx

          <ul className="features">
            <li>✔ {espacio.capacidad}</li>
            {espacio.caracteristicas.slice(0, 5).map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>

          {/* Footer */}
          <div className="card-footer-custom mt-auto">
            <span className="price">{espacio.precio}</span>

            <button
              className="btn btn-gold"
              onClick={() => onReservar(espacio)}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
