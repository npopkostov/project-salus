import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let usersCollection;
let eventsCollection;
let notLocatedEventsCollection;

export async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    const eventsMapDb = client.db("eventsmap");
    usersCollection = eventsMapDb.collection("users");
    const eventsDb = client.db("eventsDB");
    eventsCollection = eventsDb.collection("located_events");
    notLocatedEventsCollection = eventsDb.collection("not_located_events");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export { usersCollection, eventsCollection, notLocatedEventsCollection };
