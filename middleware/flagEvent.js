import { client } from "./connectToMongoDB.js";
import { ObjectId } from "mongodb";

export const flagEvent = async (req, res, next) => {
  const { _id, action } = req.body;
  const db = client.db("eventsDB");
  const eventsCollection = db.collection("located_events");
  try {
    const objectId = new ObjectId(_id);
    const event = await eventsCollection.findOne({ _id: objectId });

    if (event) {
      if (action === "flag") {
        const result = await eventsCollection.updateOne(
          { _id: objectId },
          { $set: { flagged: true } }
        );
        return res.status(200).json({ message: "Event flagged" });
      } else {
        const result = await eventsCollection.updateOne(
          { _id: objectId },
          { $unset: { flagged: "" } }
        );
        return res.status(200).json({ message: "Event unflagged" });
      }
    }
  } catch (error) {
    console.error("Error finding the event", error);
  }
  next();
};
