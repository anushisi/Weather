import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import cloudIcon from '../Assets/cloud.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [api_key] = useState("63888cea9eab218c27478fb1a540fa4c");
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    wind: '',
    temperature: '',
    location: ''
  });

  const search = async () => {
    const elements = document.getElementsByClassName("cityInput");
    if (elements[0].value === "") {
      return 0;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${elements[0].value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log('API Response:', data); // Log the API response to the console

      setWeatherData({
        humidity: data.main.humidity + " %",
        wind: data.wind.speed + " km/h",
        temperature: data.main.temp + " °C",
        location: data.name
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='search' />
        <div className='search_icon' onClick={search}>
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={cloudIcon} alt='Cloud Icon' />
      </div>
      <div className='weather-temp'>
        {weatherData.temperature}
      </div>
      <div className='weather-location'>{weatherData.location}</div>
      <div className='data-container'></div>
      <div className='element'>
        <img src={windIcon} alt='Wind Icon' className='icon' />
        <div className='data'>
          <div className='humidity-percent'>{weatherData.wind}</div>
          <div className='text'>Wind Speed</div>
          <img src={humidityIcon} alt='Humidity Icon' />
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
