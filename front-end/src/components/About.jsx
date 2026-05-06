import "./About.css";

function About() {
  return (
    <section className="about-section">
        <div className="about-text">
          <h2>Quiénes Somos</h2>
          <p>
           Somos un espacio de cowork diseñado para impulsar la creatividad, la colaboración y el crecimiento profesional.
          </p>
           
          <p>
            Creemos en el poder de las ideas compartidas y en construir una comunidad donde emprendedores y empresas puedan desarrollarse juntos.

          </p>
          <p>
           Más que un lugar, somos un punto de encuentro para innovar, conectar y crear.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Cowork"
         />
        </div>
    </section>
);
}

export default About;