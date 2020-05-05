import React, { Component } from 'react';
import { contains, handleResponse, capitalize } from '../../helpers';
import * as countries from '../../countries.json';
import './App.css';
import Searchbox from '../searchbox/Searchbox';
import Location from '../location/Location';
import Controls from '../controls/Controls';
import Loading from '../loading/Loading';
import Forecast from '../forecast/Forecast';
import config from '../../config';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentWeather: {
        temp: null,
        icon: null,
        description: null
      },
      data: [],
      city: '',
      country: '',
      loading: false,
      geoError: false,
      locationError: false,
      view: {
        forecast: 'hourly',
        temp: 'celsius',
        display: 'list'
      }
    }
    
    this.getCoordinates = this.getCoordinates.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  getCoordinates() {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
    navigator.geolocation.getCurrentPosition((pos) => {
      // Get location from coordinates
      const locationURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${config.locationKey}`;
      fetch(locationURL)
        .then(handleResponse)
        .then(data =>  {
          // Find city name
          const match = data.results[0].address_components.find(component => {
            return contains(component.types, ['locality', 'political', 'postal_town', 'administrative_area_level_2', 'administrative_area_level_1']);
          });
          if (match !== undefined) {
            this.fetchData(match.long_name);
          }
          this.setState({ loading: false });
        })
        .catch(error => {
          this.setState({ geoError: true, loading: false });
        });
    }, (error) => {
      this.setState({ geoError: true, loading: false });
    }, { timeout: 10000 });
  }

  getPromiseData(promisesArray) {
    return new Promise((resolve, reject) => {
      Promise.all(promisesArray)
        .then(res => {
          return res.map(r => r.json());
        })
        .then(res => {
          Promise.all(res)
            .then(resolve);
        })
        .catch(reject);
    });
  }
  
  fetchData(searchedCity) {
    this.setState({ loading: true, locationError: false, geoError: false });

    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=metric&APPID=${config.weatherKey}`;
    const weatherURL2 = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&APPID=${config.weatherKey}`;

    this.getPromiseData([fetch(weatherURL), fetch(weatherURL2)])
      .then(data => {
        const match = countries.find((country) => {
          return data[0].city.country === country.alpha_2;
        });
        const country = match.name || 'Country not found';
        const currentWeather = Object.assign({}, this.state.currentWeather);
        currentWeather.temp = data[1].main.temp;
        currentWeather.icon = data[1].weather[0].icon;
        currentWeather.description = capitalize(data[1].weather[0].description);
        this.setState({
          data: data[0].list,
          city: data[0].city.name,
          country,
          currentWeather,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ locationError: true, loading: false });
      });
  }

  componentDidMount() {
    this.getCoordinates();
  }

  changeView(key, value) {
    const view = {...this.state.view};
    view[key] = value;
    this.setState({ view });
  }

  render() {
    const { data, city, country, loading, geoError, locationError, view, currentWeather } = this.state;

    if (loading) {
      return (
        <div>
          <Searchbox fetchData={this.fetchData} />
          <Loading/>
        </div>
      );
    } else if (geoError) {
      return (
        <div>
          <Searchbox fetchData={this.fetchData} />
          <p className="error-message">Sorry, couldn't locate your position.</p>
        </div>
      );
    } else if (locationError) {
      return (
        <div>
          <Searchbox fetchData={this.fetchData} />
          <p className="error-message">Sorry, couldn't find your city.</p>
        </div>
      );
    }
    return (
      <div>
        <Searchbox fetchData={this.fetchData} />
        <Location country={country} city={city} currentWeather={currentWeather} unit={view.temp} />
        <Controls changeView={this.changeView} view={view} />
        <div className="forecast">
          <Forecast
            data={data}
            view={view}
          />
        </div>
      </div>
    );
  }
}

export default App;