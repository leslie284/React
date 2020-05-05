import React from 'react';

const Days = ({ date, day, icon, tempMin, tempMax }) => {
  return (
    <li>
      <div className="time">{date}
      <br/>
      {day}
      </div>
      <img className="icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt=""/>
      <div className="temp">
        <span className="temp-max">{tempMax}&#176;</span>
        <span className="temp-min">/ {tempMin}&#176;</span>
      </div>
    </li>
  );
};

export default Days;