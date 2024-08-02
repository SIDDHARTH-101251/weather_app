import { format } from "date-fns";
import "./index.css";

const ForecastDisplay = (props) => {
  const { data } = props;
  const updatedData = {
    dtText: data.dt_txt,
    main: data.main,
    weather: data.weather,
  };
  const { dtText, main, weather } = updatedData;
  const { description } = weather[0];
  const { temp } = main;
  const formattedDate = format(dtText, "do MMMM, EEEE");
  return (
    <div className="forecast">
      <div className="forecast-content-container">
        <p className="forecast-date">{formattedDate}</p>
      </div>
      <div className="forecast-content-container">
        <i className="fa-solid fa-cloud forecast-cloud-icon"></i>
        <p className="forecast-description">{description}</p>
      </div>
      <div className="forecast-content-container">
        <i className="fa-solid fa-thermometer forecast-thermameter-icon"></i>
        <p className="forecast-temperature">
          {temp}
          <sup>o</sup>C
        </p>
      </div>
    </div>
  );
};

export default ForecastDisplay;
