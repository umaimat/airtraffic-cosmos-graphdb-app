# Air Traffic Visualization App

## Objective

The objective of this project is to create a full-stack application that visualizes flight data on an interactive map. Users can click on airports to see outgoing flights and their destinations.

## Components Used

- **Frontend**: React.js, Leaflet.js for map visualization
- **Backend**: Flask (Python) for API
- **Database**: Azure Cosmos DB (Emulator) for data storage

## Frontend

The frontend is a React application that utilizes the `react-leaflet` library to render an interactive map. Users can view markers representing airports, click on these markers to see details, and visualize flight paths from the selected airport to various destinations.

### Features

- Interactive map with zoom and pan capabilities
- Custom markers for airport locations
- Dynamic polylines representing flight paths

### Setup

To run the frontend on your local machine:

1. Clone the repository.
2. Navigate to the frontend directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the React development server.

## Backend

The backend is a Flask application responsible for interfacing with Azure Cosmos DB to fetch flight and airport data.

### API Endpoints

- `GET /airports`: Fetches a list of airports.
- `GET /flights`: Fetches a list of flights.

### Setup

To set up and run the backend:

1. Ensure Python is installed on your system.
2. Navigate to the backend directory.
3. Create a virtual environment with `python -m venv venv`.
4. Activate the virtual environment.
5. Install dependencies with `pip install -r requirements.txt`.
6. Start the server with `flask run`.

## Graph Model Database

The graph database is structured to represent the relationships and data points relevant to air traffic and airport connections.

### Vertices (Nodes)

Vertices in the graph represent entities such as airports and airlines.

- **Airport**: Represents an individual airport.
  - Properties:
    - `id`: A unique identifier for the airport.
    - `name`: The name of the airport.
    - `location`: The city or area where the airport is located.
    - `coordinates`: The geographical coordinates of the airport (latitude and longitude).

- **Airline**: Represents an airline company.
  - Properties:
    - `id`: A unique identifier for the airline.
    - `name`: The name of the airline.

### Edges (Relationships)

Edges in the graph represent the connections between entities, such as flights between airports and the operation of flights by airlines.

- **Flight**: Represents a flight from one airport to another.
  - Properties:
    - `id`: A unique identifier for the flight.
    - `flight_number`: The flight number.
    - `departure_time`: The scheduled departure time of the flight.
    - `arrival_time`: The scheduled arrival time of the flight.

### Objective of Edges and Vertices

The objective of defining edges and vertices in our graph database is to:

- Model the complex network of global air traffic.
- Allow efficient querying of flight connections between airports.
- Enable analysis of airline operations, including flight frequencies, routes, and timings.
- Provide a clear visualization of air traffic for users, aiding in understanding of global connectivity and travel options.

This graph model enables various analyses such as finding the shortest path between airports, determining the most connected airports, and understanding the network's robustness.

### Graph DB Structure

Azure Cosmos DB is used to store and manage the data, with the following containers:

- `AirportMaster`: Contains data about airports, including their names and locations.
- `AirlineMaster`: Contains data about airlines, including their names and locations.
- `FlightGraph`: Contains data about flights, including departure and arrival airports, times, and flight numbers.

![Screenshot of the AirortMaster Data](/screenshots/2.png "Airport Master Data")
Airport Master Data

![Screenshot of the AirlineMaster Data](/screenshots/1.png "Airline Master Data")
Airline Mater Data

![Screenshot of the FlightGraph Data](/screenshots/3.png "Flight Graph Data")
Flight Graph Data

## Screenshots

Here are some screenshots of the Air Traffic Visualization App in action:

![Main Interface](/screenshots/7.png "Main Interface")
The main interface of the application showing the interactive map with airport markers.

![Airport Details](/screenshots/4.png "Airport Details")
Details view when an airport marker is clicked, showing the flight paths.

![Flight Information](/screenshots/5.png "Flight Information")
Popup showing the flight information after selecting a flight path.

![Flight Information](/screenshots/6.png "Flight Information")
Popup showing the flight information after selecting a flight path.

## Contributing

Contributions are welcome, and any contributors should adhere to the following steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Add and commit your changes.
4. Push to your fork and submit a pull request.

## License

[MIT License](LICENSE)

