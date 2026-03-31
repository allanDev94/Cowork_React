import { useState } from "react";
import "../styles/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validate = () => {
    if (!email) return "El correo es obligatorio";
    if (!email.includes("@")) return "Correo inválido";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setMessage(error);
      return;
    }

    // simulación (sin backend)
    setMessage("Si el correo existe, recibirás instrucciones ");
  };

  return (
    <div className="auth-container">
      <h2>Recuperar contraseña</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>

      {message && <p className="error">{message}</p>}

      <p>
        ¿Recordaste tu contraseña?{" "}
        <a href="/" className="auth-link">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;