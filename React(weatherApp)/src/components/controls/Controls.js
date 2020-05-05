import React from 'react';
import PropTypes from 'prop-types';
import './Controls.css';

class Controls extends React.Component {
  constructor(props) {
    super();

    this.handleClick= this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeView(e.target.dataset["id"], e.target.id);
  }

  render() {
    const { forecast, temp, display } = this.props.view;

    return (
      <div className="controls">
        <div className="forecast-buttons">
          <span className="control-title">Forecast</span>
          <button id="hourly" data-id="forecast" onClick={this.handleClick}
            className={forecast === 'hourly' ? "btn btn-left active" : "btn btn-left"} >Hourly</button>
          <button id="daily" data-id="forecast" onClick={this.handleClick}
            className={forecast === 'daily' ? "btn btn-right active" : "btn btn-right"}>Daily</button>
        </div>
        <div className="temperature-buttons">
          <span className="control-title">Temperature</span>
          <button id="celsius" data-id="temp" onClick={this.handleClick}
            className={temp === 'celsius' ? "btn btn-left active" : "btn btn-left"} >Celsius</button>
          <button id="fahrenheit" data-id="temp" onClick={this.handleClick}
            className={temp === 'fahrenheit' ? "btn btn-right active" : "btn btn-right"} >Fahrenheit</button>
        </div>
        <div className="view-buttons">
          <span className="control-title">View</span>
          <button id="list" data-id="display" onClick={this.handleClick}
            className={display === 'list' ? "btn btn-left active" : "btn btn-left"} >List</button>
          <button id="graph" data-id="display" onClick={this.handleClick}
            className={display === 'graph' ? "btn btn-right active" : "btn btn-right"} >Graph</button>
        </div>
      </div>
    );
  }
};

Controls.propTypes = {
  changeView: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
};

export default Controls;