import { useState } from "react";
import { login } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";

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
      return "La contraseña debe tener mínimo 6 caracteres";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="auth-container">
      <h2>Autentificación</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">Iniciar Sesión</button>
      </form>

      {error && <p className="error">{error}</p>}

        <p>
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
  );
};

export default Login;