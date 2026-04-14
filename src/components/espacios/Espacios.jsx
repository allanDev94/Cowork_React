import { espacios } from "../../data/espacios";
import CardEspacio from "./CardEspacio";

const Espacios = () => {

    return(
        <>
        <div className="container">
            <div className="row">
                {espacios.map((espacio, index) => (
                    <CardEspacio key={index} espacio={espacio}/>
                ))}
            </div>

        </div>
        </>
    )
}

export default Espacios;