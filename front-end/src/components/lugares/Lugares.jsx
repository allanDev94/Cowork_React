import { espacios } from "../../data/espacios";
import Lugar from "../lugares/Lugar";
import { useNavigate, useLocation } from "react-router";

const Lugares = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener filtro desde URL
  const params = new URLSearchParams(location.search);
  const lugarActivo = params.get("lugar");

  const lugaresUnicos = [...new Set(espacios.map((e) => e.lugar))];

  const handleClick = (lugar) => {
    if (lugarActivo === lugar) {
      navigate("/espacios"); // si ya esta activo, quita el filtro
    } else {
      navigate(`/espacios?lugar=${encodeURIComponent(lugar)}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row g-3 justify-content-center">
          {lugaresUnicos.map((lugar, i) => (
            <Lugar
              key={i}
              lugar={lugar}
              onClick={handleClick}
              isActive={lugarActivo === lugar}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Lugares;
