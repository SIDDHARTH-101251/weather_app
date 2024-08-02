import { Component } from "react";
import "./index.css";
import ForecastDisplay from "../ForecastDisplay";

class Forecast extends Component {
  constructor(props) {
    super(props);
    const { lat, lon } = props;
    this.state = {
      lat,
      lon,
      forecast: [],
      name: "Jaunpur",
      loading: true,
    };
  }

  getWeatherData = async () => {
    const { lat, lon } = this.state;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let filteredList = [];
      let uniqueDates = new Set();

      for (let i = 0; i < data.list.length; i++) {
        let date = data.list[i].dt_txt.split(" ")[0]; // Extract date part

        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          filteredList.push(data.list[i]);
        }
      }

      this.setState({
        forecast: filteredList,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  componentDidMount() {
    this.updateLocationData();
  }

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
          this.getWeatherData
        );
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  render() {
    const { forecast } = this.state;
    const slicedForecast = forecast.slice(1);
    return (
      <div className="forecast-container">
        {slicedForecast.map((eachItem) => (
          <ForecastDisplay data={eachItem} />
        ))}
      </div>
    );
  }
}

export default Forecast;
