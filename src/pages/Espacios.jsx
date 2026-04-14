import { espacios } from "../data/espacios";
import Card from "../components/Card";
import { useState } from "react";
import ReservaModal from "../components/ReservaModal";

const Espacios = () => {
  const [selectedEspacio, setSelectedEspacio] = useState(null);

  const handleReservar = (espacio) => {
    setSelectedEspacio(espacio);
  };

  return (
    <main>
      <section className="espacios-section">
        <div className="container">

          {/* HEADER */}
          <div className="text-center mb-4 titulo-espacios">
            <h2 className="display-5 fw-bold text-light">
              Nuestros Espacios
            </h2>
            <hr className="border-light opacity-50" />
            <p className="text-secondary">
              Elige el espacio que mejor se adapte a tus necesidades
            </p>
          </div>

          {/* GRID */}
          <div className="row g-4">
            {espacios.map((espacio) => (
              <Card
                key={espacio.id}
                espacio={espacio}
                onReservar={handleReservar}
              />
            ))}
          </div>

        </div>
      </section>

      {/* MODAL */}
      <ReservaModal
        espacio={selectedEspacio}
        onClose={() => setSelectedEspacio(null)}
      />
    </main>
  );
};

export default Espacios;