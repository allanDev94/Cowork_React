import "../../styles/lugar.css";

const Lugares = ({ lugar, onClick, isActive = false }) => {
  return (
    <>
      <div className="col-md-3">
        <div
          className={`card shadow-sm border-0 text-center lugar ${
            isActive ? "active" : ""
          }`}
          onClick={() => onClick(lugar)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body py-4">
            <h5 className="mb-0 text-capitalize">{lugar}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lugares;
