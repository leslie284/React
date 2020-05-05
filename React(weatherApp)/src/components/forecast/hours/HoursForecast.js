import React from 'react';
import PropTypes from 'prop-types';
import Hours from './Hours';
import { cToF, capitalize } from '../../../helpers';

const HoursForecast = ({ data, temp }) => {
  
  const shortenedArray = data.slice(0, 7);
  
  return shortenedArray.map((elem, index) => {
    return <Hours
            key={index}
            hour={elem.dt_txt.substring(11, elem.dt_txt.length - 6) + 'h'}
            description={capitalize(elem.weather[0].description)}
            icon={elem.weather[0].icon}
            temp={temp === 'celsius' ? Math.round(elem.main.temp) : Math.round(cToF(elem.main.temp))}
          />;
  });
}

HoursForecast.propTypes = {
  data: PropTypes.array.isRequired,
  temp: PropTypes.string.isRequired
}

export default HoursForecast;