import React from 'react';
import PropTypes from 'prop-types';
import './Location.css';
import { cToF } from '../../helpers';

const Location = ({ country, city, currentWeather, unit }) => {
  const temp = unit === 'celsius' ? Math.round(currentWeather.temp) : Math.round(cToF(currentWeather.temp));

  return (
    <div className="location-current">
      <div className="location">
        <span className="city-name">{city}, </span>
        <span className="country-name">{country}</span>
      </div>
      <div className="currentWeather">
        <span className="currentTemp">{temp} &#176;</span>
        <img src={`http://openweathermap.org/img/w/${currentWeather.icon}.png`} className="currentIcon" alt="Weather icon"/>
        <div className="currentDescription">{currentWeather.description}</div>
      </div>
    </div>
  );
};

Location.propTypes ={
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  currentWeather: PropTypes.object.isRequired
};

export default Location;