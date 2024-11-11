import { client } from "./connectToMongo.js";

export const uploadDB = async function (path, finalObj) {
  const db = client.db("eventsDB");

  if (path === "located") {
    try {
      const eventsCollection = db.collection("located_events");

      await eventsCollection.insertOne(finalObj);

      console.log(`Successfully updated database with detailed data`);
    } catch (error) {
      console.log("Failed to update database:", error);
    }
  } else {
    try {
      const eventsCollection = db.collection("not_located_events");

      await eventsCollection.insertOne(finalObj);

      console.log(`Successfully updated database with unlocated event data`);
    } catch (error) {
      console.log("Failed to update database:", error);
    }
  }
};
