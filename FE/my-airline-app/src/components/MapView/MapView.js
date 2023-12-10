import './MapView.css';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const airportIcon = new L.Icon({
  iconUrl: '/airport-icon.png',
  iconSize: [35, 35]
});

const MapView = ({ airports, flights }) => {
  const [selectedAirport, setSelectedAirport] = useState(null);

  // Function to get all flight paths from the selected airport
  const getFlightPaths = (airportId) => {
    return flights
      .filter(flight => flight.departure_airport === airportId)
      .map(flight => {
        const destinationAirport = airports.find(a => a.id === flight.destination_airport);
        return destinationAirport ? [
          [parseFloat(airports.find(a => a.id === airportId).coordinates.lat), parseFloat(airports.find(a => a.id === airportId).coordinates.lng)],
          [parseFloat(destinationAirport.coordinates.lat), parseFloat(destinationAirport.coordinates.lng)]
        ] : null;
      })
      .filter(path => path != null); // Filter out any undefined paths
  };

  return (
    <MapContainer center={[20, 77]} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {airports.map((airport) => (
        <Marker
          key={airport.id}
          position={[parseFloat(airport.coordinates.lat), parseFloat(airport.coordinates.lng)]}
          icon={airportIcon}
          eventHandlers={{
            click: () => {
              setSelectedAirport(airport.id); // Set the clicked airport as the selected airport
            },
          }}
        >
          <Popup>{airport.name}</Popup>
        </Marker>
      ))}
      {selectedAirport && getFlightPaths(selectedAirport).map((path, index) => (
        <Polyline key={index} positions={path} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MapView;
