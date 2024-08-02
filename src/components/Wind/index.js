import "./index.css";

const Wind = (props) => {
  const { wind } = props;

  const getWindDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) {
      return "North";
    } else if (deg >= 22.5 && deg < 67.5) {
      return "North - East";
    } else if (deg >= 67.5 && deg < 112.5) {
      return "East";
    } else if (deg >= 112.5 && deg < 157.5) {
      return "South - East";
    } else if (deg >= 157.5 && deg < 202.5) {
      return "South";
    } else if (deg >= 202.5 && deg < 247.5) {
      return "South -West";
    } else if (deg >= 247.5 && deg < 292.5) {
      return "West";
    } else if (deg >= 292.5 && deg < 337.5) {
      return "North -West";
    }
  };

  const { speed, deg, gust } = wind;

  const windDirection = getWindDirection(deg);
  return (
    <div className="wind-container">
      <i className="fa-solid fa-wind wind-icon"></i>
      <p className="wind-direction">{windDirection}</p>
      <p className="wind-speed">Speed {speed} km/h</p>
      <p className="wind-gust">Gust {gust} km/h</p>
    </div>
  );
};

export default Wind;
