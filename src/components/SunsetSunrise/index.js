import { format, fromUnixTime } from "date-fns";
import "./index.css";

const SunsetSunrise = (props) => {
  const { sys } = props;

  const convertToIST = (unixTime) => {
    if (!unixTime) return null;
    const date = fromUnixTime(unixTime);
    return date;
  };

  let { sunset, sunrise } = sys;
  sunset = convertToIST(sunset);
  sunrise = convertToIST(sunrise);

  const formatTime = (date) => {
    if (!date) return "Invalid time";
    return format(date, "hh:mm a");
  };

  return (
    <div className="sunset-sunrise-container">
      <div className="sunrise-container">
        <i className="fa-solid fa-sun sunrise-sunset-icon"></i>
        <p className="sunrise-sunset-text">Sunrise</p>
        <p className="sunrise-sunset-time">{formatTime(sunrise)}</p>
      </div>
      <div className="sunset-container">
        <i className="fa-solid fa-moon sunrise-sunset-icon"></i>
        <p className="sunrise-sunset-text">Sunset</p>
        <p className="sunrise-sunset-time">{formatTime(sunset)}</p>
      </div>
    </div>
  );
};

export default SunsetSunrise;
