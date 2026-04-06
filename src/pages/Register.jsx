import { useState } from "react";
import { register } from "../services/authService";
import "../styles/auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({nombre:"", apellido:"", email: "", telefono:"", password: "", confirmPassword:"" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.nombre || !form.apellido || !form.email || !form.telefono || !form.password || !form.confirmPassword) {
      return "Todos los campos son obligatorios";
    }

    if (!form.email.includes("@")) {
      return "Correo inválido";
    }

    if (form.password.length < 6) {
      return "Mínimo 6 caracteres en la contraseña";
    }

    if (form.password !== form.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      console.log(error);
      setMessage(error);
      return;
    }

    const result = register(form.nombre, form.apellido, form.email, form.telefono, form.password);

    if (!result.success) {
      setMessage(result.message);
    } else {
      setMessage("Cuenta creada correctamente 🎉");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-container w-100" style={{ maxWidth: "420px" }}>
        <h2 className="mb-3">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="form-control mb-3"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                className="form-control mb-3"
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Correo"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button type="submit" className="button w-100 mt-2">
            Registrarse
          </button>
        </form>

        {message && <p className="error mt-3">{message}</p>}

        <p className="mt-3">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;