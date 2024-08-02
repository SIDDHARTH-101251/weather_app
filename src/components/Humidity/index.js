import "./index.css";

const Humidity = (props) => {
  const { main } = props;
  const { humidity } = main;
  return (
    <div className="humidity-container">
      <i className="fa-solid fa-droplet humidity-icon"></i>
      <p className="humidity">Humidity</p>
      <p className="humidity-percent">{humidity} %</p>
    </div>
  );
};

export default Humidity;
