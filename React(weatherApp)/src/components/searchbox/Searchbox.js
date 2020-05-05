import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Searchbox.css';

class Searchbox extends Component {
  constructor(props) {
    super();

    this.state = {
      error: null
    };
  }

  handleSearch(e) {
    e.preventDefault();
    if (!this.searchInput.value) {
      const error = 'Please enter a location';
      this.setState(() => ({error}));
    } else {
      this.props.fetchData(this.searchInput.value, false);
      this.setState(() => ({error: null}));
    }
    this.searchInput.value = '';
  }
  
  render() {
    return (
      <div className="searchbox">
        <form className="search-form" onSubmit={this.handleSearch.bind(this)}>
          <input className="btn-left" ref={(searchInput) => this.searchInput = searchInput} type="text" placeholder="Enter your location"/>
          <button className="btn-right">Get Weather Data</button>
        </form>
        {this.state.error && <p className="search-error">{this.state.error}</p>}
        <div className="help">
          <img src="./info.png" alt=""/>
          Not the location you meant? Try searching with the country-code (
          <i>"London,UK" or "London,GB"</i>).
        </div>
      </div>
    );
  }
}

Searchbox.propTypes = {
  fetchData: PropTypes.func.isRequired
};

export default Searchbox;