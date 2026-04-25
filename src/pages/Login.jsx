import { useState } from "react";
import { login } from "../services/authService";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "Todos los campos son obligatorios";
    }

    if (!form.email.includes("@")) {
      return "Correo inválido";
    }

    if (form.password.length < 6) {
      return "Contraseña incorrecta";
    }

    return null;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = login(form.email, form.password);

    if (!result.success || !result.user) {
      setError(result.message || "Error al iniciar sesión");
    } else {
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/espacios");
    }
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-container w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3">Autentificación</h2>

        <form onSubmit={handleSubmit} className="w-100">
          <input
            type="email"
            name="email"
            placeholder="Correo"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button type="submit" className="button w-100 mt-2">
            Iniciar Sesión
          </button>
        </form>

        {error && <p className="error mt-3">{error}</p>}

        <p className="mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-link">
            Regístrate
          </Link>
        </p>

        <p>
          <Link to="/forgot-password" className="auth-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
