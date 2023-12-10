from azure.cosmos import CosmosClient, exceptions
import json

# Azure Cosmos DB Emulator settings
url = "https://localhost:8081"
key = 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
client = CosmosClient(url, credential=key)

# Database ID and container IDs
database_id = 'AirlineDB'
container_ids = ['AirlineMaster','AirportMaster', 'FlightGraph']  # Add all your container IDs here

# Connect to database
database = client.get_database_client(database_id)

# Loop through each container and export its data
for container_id in container_ids:
    container = database.get_container_client(container_id)
    
    try:
        # Query these items in SQL
        query = "SELECT * FROM c"
        items = list(container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))
        
        # Serialize the items to JSON
        json_data = json.dumps(items, indent=2)
        
        # Write the JSON data to a file named after the container
        filename = f"{container_id.lower()}_data.json"
        with open(filename, 'w') as file:
            file.write(json_data)
        
        print(f"Data exported to {filename}")
    
    except exceptions.CosmosHttpResponseError as e:
        print(f"An error occurred while querying {container_id}: {e.message}")

print("All data exported.")
