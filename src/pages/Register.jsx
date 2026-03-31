import { useState } from "react";
import { register } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

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
      return "Mínimo 6 caracteres en la contraseña";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    const result = register(form.email, form.password);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Cuenta creada correctamente 🎉");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>

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

        <button type="submit">Registrarse</button>
      </form>

      {message && <p className="error">{message}</p>}

      <p>
        ¿Ya tienes cuenta? <Link to="/" className="auth-link">
                Inicia sesión
            </Link>
      </p>
    </div>
  );
};

export default Register;