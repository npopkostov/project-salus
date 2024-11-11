import { client } from "../mongoDB/connectToMongo.js";

const db = client.db("police_reports");
const keywordSelection = db.collection("keywords");
const keywords = await keywordSelection.find({}).toArray();

export const findFelony = async function (event) {
  for (const collection of keywords) {
    for (const felony of collection.related_keywords) {
      const felonyRegex = new RegExp(
        `(^|[\\s.,!?(){}\\[\\]"“”])${felony}([\\s.,!?(){}\\[\\]"“”]|$)`,
        "i"
      );
      if (felonyRegex.test(event)) {
        const typeOffelony = collection.category;
        return typeOffelony;
      }
    }
  }
  return "unknown";
};
