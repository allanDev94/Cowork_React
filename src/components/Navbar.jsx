import { Link } from "react-router"
import { logout } from "../services/authService";
import { useNavigate } from "react-router";
import "../styles/Navbar.css"

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // limpia datos
        navigate("/"); // vuelve al login
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">
                        <i className="bi bi-building"></i>
                        <span className="brand-text">CoWork Space</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/home">
                                    Espacios
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/mis-reservas">
                                    Mis Reservas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/contacto">
                                    Contacto
                                </Link>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link" id="usuarioNombre">
                                    <i className="bi bi-person-circle"></i> Usuario
                                </span>
                            </li>

                            <li className="nav-item">

                                <button
                                    onClick={handleLogout}
                                    className="nav-link btn btn-link"
                                    id="cerrarSesion"
                                >
                                    <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;