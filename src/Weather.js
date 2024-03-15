import React, { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {
  // const api = {
  //   key: "11919206ab1cd022a735df3eb09e5468",
  //   base: "https://api.openweathermap.org/data/2.5/",
  // };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(""); // State for current date
  const [currentTime, setCurrentTime] = useState(""); // State for current time

  useEffect(() => {
    const api = {
      key: "11919206ab1cd022a735df3eb09e5468",
      base: "https://api.openweathermap.org/data/2.5/",
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const result = await response.json();
        setWeather(result);
        setError(null);
        console.log(result);
      } catch (error) {
        setError(error.message);
        setWeather(null);
        console.error("Error fetching weather:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString());
      setCurrentTime(date.toLocaleTimeString());
    }, 1000); // Update time every second

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on component mount

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    if (query.trim() !== "") {
      // fetchData();
    }
  };

  return (
    <div className="search-box">
    <h2>chanduTech</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Enter City Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {currentDate && currentTime && (
        <div className="date-time">
          <p>Current Date: {currentDate}</p>
          <p>Current Time: {currentTime}</p>
        </div>
      )}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Weather;
