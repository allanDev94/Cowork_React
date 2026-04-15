import "../styles/formulario.css"
import { useState } from "react";
 
const Formulario = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [estado, setEstado] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // 👇 Limpia errores cuando el usuario escribe
    setEstado("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.nombre || !form.email || !form.mensaje) {
      setEstado("error");
      return;
    }

    if (!emailValido.test(form.email)) {
      setEstado("email_error");
      return;
    }

    setEstado("success");

    console.log(form);

    setForm({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contáctanos</h2>

      <input
        label="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <textarea
        name="mensaje"
        placeholder="Escribe tu mensaje..."
        value={form.mensaje}
        onChange={handleChange}
        className="contact-textarea"
      />

      {estado === "error" && (
        <p className="contact-error">Todos los campos son obligatorios</p>
      )}

      {estado === "email_error" && (
        <p className="contact-error">Correo inválido</p>
      )}

      {estado === "success" && (
        <p className="contact-success">Mensaje enviado correctamente ✅</p>
      )}

      <button type="submit" className="contact-button">
        Enviar
      </button>
    </form>
  );
};

export default Formulario;