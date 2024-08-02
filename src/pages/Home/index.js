import { Component } from "react";
import { format, isAfter, isBefore, fromUnixTime } from "date-fns";
import { CircleLoader } from "react-spinners";
import HomeMedium from "../HomeMedium";
import HomeLarge from "../HomeLarge";
import MainWeather from "../../components/MainWeather";
import "./index.css";
import "animate.css";
import Wind from "../../components/Wind";
import Humidity from "../../components/Humidity";
import SeaAndGroundLevelPressure from "../../components/SeaAndGroundLevelPressure";
import Pressure from "../../components/Pressure";
import Visibility from "../../components/Visibility";
import Clouds from "../../components/Clouds";
import SunsetSunrise from "../../components/SunsetSunrise";
import NavBar from "../../components/NavBar";
import Forecast from "../../components/Forecast";

const backgroundsDay = [
  "bg-img-winter-day-sm",
  "bg-img-winter-day-sm",
  "bg-img-spring-day-sm",
  "bg-img-spring-day-sm",
  "bg-img-summer-day-sm",
  "bg-img-summer-day-sm",
  "bg-img-monsoon-day-sm",
  "bg-img-monsoon-day-sm",
  "bg-img-autumn-day-sm",
  "bg-img-autumn-day-sm",
  "bg-img-pre-winter-day-sm",
  "bg-img-pre-winter-day-sm",
];

const backgroundsNight = [
  "bg-img-winter-night-sm",
  "bg-img-winter-night-sm",
  "bg-img-spring-night-sm",
  "bg-img-spring-night-sm",
  "bg-img-summer-night-sm",
  "bg-img-summer-night-sm",
  "bg-img-monsoon-night-sm",
  "bg-img-monsoon-night-sm",
  "bg-img-autumn-night-sm",
  "bg-img-autumn-night-sm",
  "bg-img-pre-winter-night-sm",
  "bg-img-pre-winter-night-sm",
];

class Home extends Component {
  state = {
    name: "Jaunpur",
    lat: 25.7472,
    lon: 82.689,
    main: {},
    sys: {},
    weather: [],
    wind: {},
    visibility: 0,
    dayTime: true,
    loading: true,
    isMediumDevice: false,
    isLargeDevice: false,
    weatherData: {},
  };

  getWeatherData = async () => {
    const { lat, lon } = this.state;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      const { main, name, sys, visibility, weather, wind } = data;

      localStorage.setItem("weatherData", JSON.stringify(data));

      const sunrise = fromUnixTime(sys.sunrise);
      const sunset = fromUnixTime(sys.sunset);
      const current = new Date();
      const dayTime = isAfter(current, sunrise) && isBefore(current, sunset);
      this.setState({
        main,
        name,
        sys,
        visibility,
        weather,
        wind,
        dayTime,
        loading: false,
        weatherData: data,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  componentDidMount() {
    this.updateLocationData();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const isMediumDevice = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isLargeDevice = window.innerWidth >= 1024;
    this.setState({ isMediumDevice, isLargeDevice });
  };

  updateLocationData = async () => {
    const { name } = this.state;
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        this.setState(
          {
            lat: data[0].lat,
            lon: data[0].lon,
          },
          this.getWeatherData,
          localStorage.setItem("lat", JSON.stringify(data[0].lat)),
          localStorage.setItem("lon", JSON.stringify(data[0].lon))
        );
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  searchLocation = (event) => {
    if (event.key === "Enter") {
      this.setState(
        {
          name: event.target.value,
          loading: true,
        },
        this.updateLocationData
      );
    }
  };

  render() {
    const date = new Date();
    const formattedDate = format(date, "do MMMM, EEEE");
    const {
      dayTime,
      main,
      wind,
      visibility,
      weather,
      sys,
      name,
      loading,
      isMediumDevice,
      isLargeDevice,
      lat,
      lon,
    } = this.state;
    const current = new Date();
    const month = format(current, "MM");
    const monthNum = month[0] === "0" ? parseInt(month[1]) : parseInt(month);
    const bgClass = dayTime
      ? backgroundsDay[monthNum - 1]
      : backgroundsNight[monthNum - 1];
    return loading ? (
      <div className="loader-container">
        <CircleLoader color="#36d7b7" />
      </div>
    ) : isMediumDevice ? (
      <HomeMedium />
    ) : isLargeDevice ? (
      <HomeLarge lat={lat} lon={lon} />
    ) : (
      <>
        <div className="search-location-container">
          <div className="location-icon-container">
            <i className="fa-solid fa-location-dot location-icon"></i>
          </div>
          <input
            type="search"
            className="search-input-element-style"
            onKeyDown={this.searchLocation}
            placeholder={name}
          />
          <div className="search-icon-container">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </div>
        <div className="app-container animate__animated animate__fadeIn animate__slow">
          <MainWeather
            className={bgClass}
            date={formattedDate}
            main={main}
            day={dayTime}
            name={name}
          />
          <div className="wind-humidity-container">
            <Wind wind={wind} />
            <Humidity main={main} />
          </div>
          <SeaAndGroundLevelPressure main={main} />
          <div className="pressure-visibility-clouds-container">
            <Pressure main={main} />
            {visibility !== null ? (
              <Visibility visibility={visibility} />
            ) : (
              <p>Loading...</p>
            )}
            <Clouds weather={weather} />
          </div>
          <SunsetSunrise sys={sys} />
          <Forecast />
        </div>
        <NavBar />
      </>
    );
  }
}

export default Home;
