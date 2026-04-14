const KEY = "reservas";

export const getReservas = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const crearReserva = (reserva) => {
  const reservas = getReservas();

  const nueva = {
    id: Date.now(),
    ...reserva,
  };

  reservas.push(nueva);

  localStorage.setItem(KEY, JSON.stringify(reservas));
};