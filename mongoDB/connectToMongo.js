import { MongoClient, ServerApiVersion } from "mongodb";

// The uri is deleted because it will interfere with the current database
const uri = "deleted on purpose";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToMongo() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export async function closeConnection() {
  try {
    await client.close();
    console.log("Connection to MongoDB closed");
  } catch (error) {
    console.error("Error closing the connection to MongoDB", error);
  }
}

export async function fetchLocations() {
  const db = client.db("locations");
  const citiesCollection = db.collection("cities");

  try {
    const cities = await citiesCollection.find({}).toArray();
    return cities;
  } catch (error) {
    console.error("Error fetching locations-cities", error);
  }
}

export { client };
