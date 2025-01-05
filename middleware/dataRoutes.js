import express from "express";
import {
  eventsCollection,
  notLocatedEventsCollection,
  usersCollection,
} from "./connectToMongoDB.js";
import { tokenAuthenticator, checkRole } from "./routeAuthenticator.js";
import { flagEvent } from "./flagEvent.js";
import { ObjectId } from "mongodb";

const dataRouter = express.Router();

// @desc Dashboard/Home Get all Events
// @method GET
// /All events
dataRouter.get("/dashboard/home", async (req, res) => {
  let dataObj = {
    total: null,
    notLocated: null,
    year: {
      events2015: null,
      events2016: null,
      events2017: null,
      events2018: null,
      events2019: null,
      events2020: null,
      events2021: null,
      events2022: null,
      events2023: null,
      events2024: null,
      events2025: null,
    },
    avgScore: null,
    reports: null,
    type: {
      unknown: null,
      "traffic accident": null,
      drugs: null,
      arrest: null,
      bites: null,
      shooting: null,
      "traffic sanctions": null,
      "physical violence": null,
      fire: null,
      robbery: null,
      "illegal hunting": null,
      "identity theft": null,
      forgery: null,
      accidents: null,
      "missing person": null,
    },
    latestDate: null,
    users: null,
  };
  try {
    // Total events
    dataObj.total = await eventsCollection.countDocuments();
    // Total notLocated events
    dataObj.notLocated = await notLocatedEventsCollection.countDocuments();

    // Defining star year
    const startYear = 2015;
    // Defining current year // this will have to be updated
    const endYear = 2025;
    // Defining current date
    const currentDate = new Date();
    // Defining current year
    const currentYear = currentDate.getFullYear();
    // Current day string
    const todayDateString = currentDate.toISOString().split("T")[0];
    // Defining previous date
    const previousDate = new Date(currentDate);
    // Defining prious date (-1 day of current date)
    previousDate.setDate(currentDate.getDate() - 1);
    // Dfining previous date string
    const previousDateString = previousDate.toISOString().split("T")[0];

    // Loop through years starging from 2015 to 2024
    for (let year = startYear; year <= endYear; year++) {
      let startDate = `${year}-01-01`;
      let endDate = `${year}-12-31`;

      // If year is 2025 query until current date
      if (year === 2025) {
        endDate = todayDateString;
        dataObj.year[`events${year}`] = await eventsCollection.countDocuments({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        });

        // If current date is not scraped query to previous date
        if (dataObj.year[`events${year}`].length === 0) {
          endDate = previousDateString;
          dataObj.year[`events${year}`] = await eventsCollection.countDocuments({
            date: {
              $gte: startDate,
              $lte: endDate,
            },
          });
        }
        // Query for the complete years that have passed (2015-2023) and save them to dataObj
      } else {
        dataObj.year[`events${year}`] = await eventsCollection.countDocuments({
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        });
      }
    }

    //Last date entry
    const latestEventObj = await eventsCollection.findOne({}, { sort: { _id: -1 } });
    const latestDate = new Date(latestEventObj.date);
    const formattedDate = latestDate.toLocaleDateString("en-GB");
    dataObj.latestDate = formattedDate;
    // Average score
    const confidenceScoreSum = await eventsCollection
      .aggregate([
        {
          $group: {
            _id: null, // Group all documents together
            totalConfidenceScore: { $sum: "$confidenceScore" }, // Sum of confidence scores
          },
        },
      ])
      .toArray();
    const totalConfidenceScore = confidenceScoreSum[0].totalConfidenceScore;
    const avgScore = (totalConfidenceScore / dataObj.total) * 100;
    dataObj.avgScore = avgScore;

    // Reports
    const flaggedCount = await eventsCollection.countDocuments({ flagged: true });
    dataObj.reports = flaggedCount;

    // Types of felonies:
    for (const type in dataObj.type) {
      dataObj.type[type] = await eventsCollection.countDocuments({ felony: type });
    }

    //Users count
    const usersCount = await usersCollection.countDocuments({ verified: true });
    dataObj.users = usersCount;

    return res.status(200).json({ dataObj });
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc HomePage Get Events
// @method GET
// /Events for some date/dates
dataRouter.get("/dashboard/events", async (req, res) => {
  const { day, month, year } = req.query;

  const queryDate = `${year}-${month}-${day}`;
  try {
    if (!queryDate) {
      return res.status(400).json({ message: "Missing required query parameter" });
    }

    const query = { date: queryDate };

    const results = await eventsCollection.find(query).toArray();

    //Avg Score
    let confidenceScoreSum = null;
    for (const event of results) {
      confidenceScoreSum += event.confidenceScore;
    }
    const avgconfidenceScore = confidenceScoreSum / results.length;

    const locationCount = {};

    // High Activity Area
    for (let i = 0; i < results.length; i++) {
      const location = results[i].location;

      if (locationCount[location]) {
        locationCount[location]++;
      } else {
        locationCount[location] = 1;
      }
    }

    let mostFrequentLocation = "";
    let highestCount = 0;

    for (let location in locationCount) {
      if (locationCount[location] > highestCount) {
        mostFrequentLocation = location;
        highestCount = locationCount[location];
      }
    }

    if (results.length > 0) {
      return res.status(200).json({
        events: results,
        avgConfidenceScore: avgconfidenceScore.toString().slice(0, 4),
        mostFrequentLocation: mostFrequentLocation,
      });
    } else {
      return res.status(404).json({ message: "No events found" });
    }
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Flag missed event
// @method POST
// /Flag if some event is not coreccly placed/located
dataRouter.post(
  "/dashboard/events/flag/event",
  tokenAuthenticator,
  checkRole(["admin", "member"]),
  flagEvent,
  async (req, res) => {
    return res.status(200).json({ message: "Thank you for helping our app" });
  }
);

// @desc Add new note
// @method POST
// /Add new note from user
dataRouter.post("/dashboard/notes", async (req, res) => {
  const { message, user, chosenColor } = req.body;
  const colorObj = {
    firstChoice: { lightModeColor: "#ECF2FF", textColor: "#608AFF", nightModeColor: "#253662" },
    secondChoice: { lightModeColor: "#FEF5E5", textColor: "#FFAE1F", nightModeColor: "#4D3A2A" },
    thirdChoice: { lightModeColor: "#E8F7FF", textColor: "#4ABEFF", nightModeColor: "#1C455D" },
    fourthChoice: { lightModeColor: "#FDEDE8", textColor: "#FA896B", nightModeColor: "#4B313D" },
  };

  const userAccount = await usersCollection.findOne({ username: user });
  if (userAccount) {
    const noteColor = colorObj[chosenColor];
    await usersCollection.updateOne(
      { _id: userAccount._id },
      {
        $push: {
          notes: {
            note_Id: new ObjectId(),
            note: message,
            noteColor: noteColor,
            notePalette: chosenColor,
            timeStamp: new Date(),
          },
        },
      }
    );
    return res.status(200).json({ message: "New note added" });
  } else {
    return res.status(400).json({ message: "User not Found" });
  }
  // else if (userAccount && action === 'updateNote') {
  //   // update note
  // }
});

// @desc Fetch all notes
// @method GET
// /Fetch all notes for user
dataRouter.get("/dashboard/notes/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userAccount = await usersCollection.findOne({ username: username });
    const allNotes = userAccount.notes;

    if (allNotes) {
      return res.status(200).json({ userNotes: allNotes });
    } else {
      return res.status(204).json({ message: "User has no notes" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Delete note
// @method DELETE
// /Delete selected note from user
dataRouter.delete("/dashboard/notes/:username/:noteId", async (req, res) => {
  const { username, noteId } = req.params;

  try {
    const userAccount = await usersCollection.findOne({ username: username });
    const noteIdToDeleteObj = new ObjectId(noteId);

    const updatedNotes = userAccount.notes.filter(
      (note) => note.note_Id.toString() !== noteIdToDeleteObj.toString()
    );
    await usersCollection.updateOne({ username: username }, { $set: { notes: updatedNotes } });

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc Update note
// @method PUT
// /Update selected note
dataRouter.put("/dashoard/notes/update/:noteId", async (req, res) => {
  const { user, noteId, message, chosenColor } = req.body;

  const colorObj = {
    firstChoice: { lightModeColor: "#ECF2FF", textColor: "#608AFF", nightModeColor: "#253662" },
    secondChoice: { lightModeColor: "#FEF5E5", textColor: "#FFAE1F", nightModeColor: "#4D3A2A" },
    thirdChoice: { lightModeColor: "#E8F7FF", textColor: "#4ABEFF", nightModeColor: "#1C455D" },
    fourthChoice: { lightModeColor: "#FDEDE8", textColor: "#FA896B", nightModeColor: "#4B313D" },
  };

  const result = await usersCollection.updateOne(
    { username: user, "notes.note_Id": new ObjectId(noteId) },
    {
      $set: {
        "notes.$.note": message,
        "notes.$.noteColor": colorObj[chosenColor],
        "notes.$.notePalette": chosenColor,
        "notes.$.timeStamp": new Date(),
      },
    }
  );

  if (result.modifiedCount > 0) {
    return res.status(200).json({ message: "Note updated successfully" });
  } else {
    return res.status(400).json({ message: "Failed to update note" });
  }
});

export default dataRouter;
