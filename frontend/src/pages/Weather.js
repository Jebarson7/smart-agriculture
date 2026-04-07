import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Weather() {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9200c573287e59b3be6d3684bf763f3a&units=metric`
        )
        .then(res => {
          setWeather(res.data);
          setLoading(false);
        })
       .catch(() => {
  // 🌆 Fallback to Chennai if location fails
  axios.get("https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=9200c573287e59b3be6d3684bf763f3a&units=metric")
    .then(res => {
      setWeather(res.data);
      setLoading(false);
    });
});
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  } else {
    setLoading(false);
  }
}, []);

  // ⏳ Loading UI
  if (loading) {
    return <h3 style={{ textAlign: "center" }}>⏳ Loading weather...</h3>;
  }

  return (
    <div>

      <h2>🌤️ Weather Information</h2>

      {weather && (
        <div className="weather">

          {/* 🌤️ Weather Icon */}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <h3>{weather.name}</h3>

          <p>🌡️ Temperature: <b>{weather.main.temp}°C</b></p>
          <p>💧 Humidity: <b>{weather.main.humidity}%</b></p>
          <p>🌥️ Condition: <b>{weather.weather[0].main}</b></p>

        </div>
      )}

    </div>
  );
}

export default Weather;