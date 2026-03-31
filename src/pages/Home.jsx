import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia datos
    navigate("/"); // vuelve al login
  };

  return (
    <div className="auth-container">
      <h2>Bienvenido 👋</h2>

      <button onClick={handleLogout} className="logout-btn">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Home;