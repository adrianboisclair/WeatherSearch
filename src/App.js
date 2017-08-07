import React, { Component } from 'react';
import './App.css';
import WeatherComponent from './components/WeatherComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Weather Application</h2>
        </header>
        <div className="App-intro">
          <WeatherComponent />
        </div>
      </div>
    );
  }
}

export default App;
