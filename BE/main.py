from flask import Flask, jsonify
from azure.cosmos import CosmosClient, exceptions, PartitionKey, DatabaseProxy, ContainerProxy
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

url = 'https://localhost:8081'
key = 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
client = CosmosClient(url, credential=key)
database = client.get_database_client('AirlineDB')

# Containers
flight_container_name = 'FlightGraph'
airport_container_name = 'AirportMaster'
flight_container = database.get_container_client(flight_container_name)
airport_container = database.get_container_client(airport_container_name)

# Route to fetch flight data
@app.route('/flights')
def get_flights():
    try:
        query = "SELECT * FROM c WHERE c.type = 'Flight'"
        items = list(flight_container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        return jsonify(items)
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({'error': str(e)}), e.status_code

# Route to fetch airport data
@app.route('/airports')
def get_airports():
    try:
        query = "SELECT * FROM c WHERE c.type = 'Airport'"
        items = list(airport_container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        return jsonify(items)
    except exceptions.CosmosHttpResponseError as e:
        return jsonify({'error': str(e)}), e.status_code


if __name__ == '__main__':
    app.run(debug=True)
