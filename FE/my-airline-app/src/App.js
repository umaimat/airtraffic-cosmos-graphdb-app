import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import MapView from './components/MapView/MapView';

function App() {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);

  // Fetch airports data from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/airports')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAirports(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []); // The empty array ensures this effect runs once after the initial render

  // Fetch flights data from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/flights')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFlights(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []); // The empty array ensures this effect runs once after the initial render

  // Render the MapView component and pass airports and flights data as props
  return (
    <div className="App">
      <MapView airports={airports} flights={flights} />
    </div>
  );
}

export default App;
