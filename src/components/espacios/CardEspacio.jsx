import { Badge } from "react-bootstrap";

const CardEspacio = ({ espacio }) => {
    const badgeClass = 
        espacio.estado === "Disponible"
        ? "badge-accent"
        : "badge-completo";

    return(
        <>
        </>
    )

}

export default CardEspacio;