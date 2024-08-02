// import Forecast from "../../components/Forecast";
import NavBar from "../../components/NavBar";
import "animate.css";
import "./index.css";
import Map from "../../components/Map";

const WeatherMap = () => {
  return (
    <div className="animate__animated animate__fadeIn animate__slower weather-map-container-sm">
      <Map />
      <NavBar />
    </div>
  );
};

export default WeatherMap;
