import React, { useState } from "react";
import axios from "axios";
import './weather.css'

const API_KEY = "8d8f6b92c1e941631976abd511d7383c";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="card bg-image">
          {/* <img src="..." className="card-img-top" alt="..."/> */}
          <div className="card-body">
            <h5 className="card-title">{weatherData.name}, {weatherData.sys.country}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Temperature: {Math.floor(weatherData.main.temp - 273.15)} °C</li>
            <li className="list-group-item">Description: {weatherData.weather[0].description}</li>
            <li className="list-group-item">Feels Like: {Math.floor(weatherData.main.feels_like - 273.15)}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;



