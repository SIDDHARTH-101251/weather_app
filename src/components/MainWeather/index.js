import "./index.css";

const MainWeather = (props) => {
  const { className, date, main, day, name } = props;
  const updatedData = {
    temp: Math.round(main.temp),
    feelsLike: Math.round(main.feels_like),
  };
  const { temp, feelsLike } = updatedData;
  const fontColor = day ? "font-color-day" : "font-color-night";
  return (
    <div className={`main-weather-container ${className}`}>
      <h2 className={`date-style ${fontColor}`}>{date}</h2>
      <p className={`name ${fontColor}`}>{name}</p>
      <h1 className={`temperature ${fontColor}`}>
        {temp}
        <sup>o</sup>C
      </h1>
      <p className={`feels-like ${fontColor}`}>
        Feels Like &nbsp;{" "}
        <span className={`feels-like-temperature`}>
          {feelsLike}
          <sup>o</sup>C
        </span>
      </p>
    </div>
  );
};

export default MainWeather;
