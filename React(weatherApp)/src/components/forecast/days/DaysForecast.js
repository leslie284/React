import React from 'react';
import PropTypes from 'prop-types';
import Days from './Days';
import { occurence, dayNumber, dayList, cToF } from '../../../helpers';
// import moment from 'moment';

const DaysForecast = ({ data, temp }) => {

  // Find indexes when next day starts
  let indexes = [];
  let prevElem = data[0].dt_txt.substring(0, 10);

  data.forEach(function(elem, index) {
    if (elem.dt_txt.substring(0, 10) !== prevElem) {
      indexes.push(index);
      prevElem = this[index].dt_txt.substring(0, 10);
    }
  }, data);

  // Divide data into days
  const allDays = [];

  const slicer = (arr, index) => {
    if (index === arr.length) return;
    allDays.push(data.slice(arr[index], arr[index + 1]));
    index++;
    slicer(arr, index);
  };
  slicer(indexes, 0);

  // Find the lowest and highest temperatures as well as the appropriate icons to display
  const lowestTemps = [],
        highestTemps = [],
        prevalentWeatherIcon = [],
        dates = [];

  allDays.forEach((day) => {
    const sortLowest = day.sort((a, b) => {
      return a.main.temp_max - b.main.temp_max;
    });
    lowestTemps.push(sortLowest[0].main.temp_min);
    
    const sortHighest = day.sort((a, b) => {
      return b.main.temp_max - a.main.temp_max;
    });
    highestTemps.push(sortHighest[0].main.temp_max);

    prevalentWeatherIcon.push(occurence(day).weather[0].icon);

    dates.push(day[0].dt_txt.substring(5, 10));
  });

  const daysArray = [
    [lowestTemps[0], highestTemps[0], prevalentWeatherIcon[0], dates[0]],
    [lowestTemps[1], highestTemps[1], prevalentWeatherIcon[1], dates[1]],
    [lowestTemps[2], highestTemps[2], prevalentWeatherIcon[2], dates[2]],
    [lowestTemps[3], highestTemps[3], prevalentWeatherIcon[3], dates[3]],
    [lowestTemps[4], highestTemps[4], prevalentWeatherIcon[4], dates[4]]
  ];
  
  return daysArray.map((elem, index) => {
    return <Days
            key={index}
            date={elem[3]}
            day={dayList[dayNumber + index + 1]}
            icon={elem[2]}
            tempMin={temp === 'celsius' ? Math.round(elem[0]) : Math.round(cToF(elem[0]))}
            tempMax={temp === 'celsius' ? Math.round(elem[1]) : Math.round(cToF(elem[1]))}
            />;
  });
}

DaysForecast.propTypes = {
  data: PropTypes.array.isRequired,
  temp: PropTypes.string.isRequired
}

export default DaysForecast;