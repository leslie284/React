import React from 'react';
import PropTypes from 'prop-types';
import './Forecast.css';
import HoursForecast from './hours/HoursForecast';
import HoursGraph from './hours/HoursGraph';
import DaysForecast from './days/DaysForecast';
import DaysGraph from './days/DaysGraph';

class Forecast extends React.Component {

  render() {
    const data = this.props.data;
    const { forecast, display, temp } = this.props.view;

    if (forecast === 'hourly' && display === 'list') {
      return <HoursForecast data={data} temp={temp} />;
    }
    if (forecast === 'daily' && display === 'list') {
      return <DaysForecast data={data} temp={temp} />;
    }
    if (forecast === 'hourly' && display === 'graph') {
      return <HoursGraph data={data} temp={temp} />;
    }
    if (forecast === 'daily' && display === 'graph') {
      return <DaysGraph data={data} temp={temp} />;
    }
  }
}

Forecast.propTypes = {
  data: PropTypes.array.isRequired,
  view: PropTypes.object.isRequired
};

export default Forecast;