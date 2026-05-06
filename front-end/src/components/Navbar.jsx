import { Link } from "react-router"
import { NavLink } from "react-router"
import { logout } from "../services/authService";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "../styles/Navbar.css"

const Navbar = () => {

    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState("Usuario");

    useEffect(() => {
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setNombreUsuario(user.nombre || "Usuario");
        }
    }, []);

    const handleLogout = () => {
        logout(); // limpia datos
        navigate("/"); // vuelve al login
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">
                        <i className="bi bi-building"></i>
                        <span className="brand-text">CoWork Space</span>
                    </NavLink>

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
                                <NavLink className={({ isActive }) => 
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/espacios">
                                    Espacios
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => 
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/mis-reservas">
                                    Mis Reservas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => 
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/contacto">
                                    Contacto
                                </NavLink>
                            </li>
                             <li className="nav-item">
                                <NavLink className={({ isActive }) => 
                                    isActive ? "nav-link active" : "nav-link"
                                } to="/nosotros">
                                    Nosotros
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <span className="nav-link" id="usuarioNombre">
                                    <i className="bi bi-person-circle"></i> {nombreUsuario}
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