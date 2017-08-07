import React, { Component } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

class WeatherComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savedCities: [],
      fetched: false,
    };
  }

  render() {
    return(
      <div id="weather-component" className="container">
        <h3>Search for your City</h3>
        <div className="input-group">
          <input
            className="form-control"
            maxLength="5"
            placeholder={'Enter Your Zip Code'}
            type="text"
            onKeyUp={this.handleKeyUp.bind(this)}
          />
          <span className="input-group-btn">
            <button className="btn btn-secondary" onClick={this.handleSearchClick.bind(this)}>
              Search
            </button>
          </span>
        </div>
        {this.renderWeatherInfo()}
        {this.renderSavedCities()}
      </div>
    );
  }

  handleKeyUp(e) {
    this.setState({ zip: e.target.value });
  }

  handleSearchClick() {
    let zip = this.state.zip;
    this.search(zip);
  }



  getAccessPoint(zip) {
    const zipcode = 'zip=' + zip;
    const country = 'US';
    const key = '0c45c8c08ae88f19023bf1f03db86488';
    const appId = 'APPID='+key;

    return '//api.openweathermap.org/data/2.5/weather?' + zipcode + ',' + country + '&' + appId;
  }

  saveCity(city) {
    let savedCities = this.state.savedCities;
    let newCities = savedCities.concat(city);
    this.setState({savedCities: newCities});
  }

  renderWeatherInfo() {
    if(this.state.weather) {
      return (
        <CardComponent weather={this.state.weather} saveCity={this.saveCity.bind(this)}/>
      );
    }
  }

  renderSavedCities() {
    if(this.state.savedCities.length) {
      return (
        <div>
          <h3>Saved Cities</h3>
          <div className="saved-cities">
            {this.state.savedCities.map((city, index)=> {
              return (
                <CardComponent key={index} weather={city} saveCity={this.saveCity.bind(this)}/>
              );
            })}
          </div>
        </div>
      );
    }
  }
  search(zip) {
    if(zip) {
      const url = this.getAccessPoint(zip);
      const promise = axios.get(url);
      promise.then(res => this.setState({ weather: res.data }) );
      return promise;
    } else {
      const callback = (position)=> {
        return position;
      };
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(callback, callback);
      }
    }
  }
}

export default WeatherComponent;