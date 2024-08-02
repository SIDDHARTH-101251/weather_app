import "./index.css";

const Pressure = (props) => {
  const { main } = props;
  const { pressure } = main;
  return (
    <div className="pressure-container">
      <i className="fa-solid fa-temperature-three-quarters pressure-icon"></i>
      <p className="pressure-text">Pressure</p>
      <p className="pressure-value">{pressure} hPa</p>
    </div>
  );
};

export default Pressure;
