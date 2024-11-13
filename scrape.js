import puppeteer from "puppeteer";
import { connectToMongo, closeConnection, fetchLocations } from "./mongoDB/connectToMongo.js";
import { findRegion } from "./middleware/findRegion.js";
import { findDetails } from "./middleware/findDetails.js";
import { findFelony } from "./middleware/findFelony.js";
import { findWeather } from "./middleware/findWeather.js";
import { uploadDB } from "./mongoDB/updateDB.js";

let linkIndex = 3522;
let maxIndex = 3523;

const scrape = async () => {
  const browser = await puppeteer.launch();
  await connectToMongo();
  const page = await browser.newPage();

  //@desc save the locationsDB in varibale to find a match later
  const cities = await fetchLocations();

  try {
    while (linkIndex < maxIndex) {
      let pageLoaded = false;
      try {
        await page.goto(`https://mvr.gov.mk/izvadok-od-dnevni-nastani/${linkIndex}`);
        pageLoaded = true;
      } catch (error) {
        console.log(`Page with linkIndex ${linkIndex} failed to load`, error);
        await new Promise((resolve) => setTimeout(resolve, 30000));
        linkIndex++;
        continue;
      }
      if (pageLoaded) {
        try {
          await page.waitForSelector("#MainContent_litNaslov");
          const extractText = await page.evaluate(() => {
            const element = document.querySelector("#MainContent_pnlBilten");
            const bodyTitle = document.querySelector("#MainContent_pnlBilten");

            const dateRegex = /(\d{2}\.\d{2}\.\d{4})/;
            const titleAndDate = bodyTitle.innerText;
            const date = titleAndDate.match(dateRegex);
            const extractedDate = date[0];
            const [day, month, year] = extractedDate.split(".");
            const isoDate = `${year}-${month}-${day}`;

            return element ? { date: isoDate, body: element.innerText } : "";
          });

          const events = extractText.body
            .split("\n")
            .map((event) => event.trim())
            .filter((event) => event.length > 0);

          // Process the text so that it will not have different types of hyphens, "space - hyphen space" and convert multiplce spaces to one single space, lastly  transform macedonian quotes to eng quotes
          const processedEvents = events.map((event) =>
            event
              .replace(/[-–—]/g, " ")
              .replace(/ \- /g, " ")
              .replace(/\s+/g, " ")
              .replace(/[„“]/g, '"')
          );

          const regex = /\S/;

          for (const event of processedEvents) {
            try {
              if (regex.test(event)) {
                // FIRST CYCLE - DETERMINE THE REGION (НА ТЕРИТОРИЈА НА СВР-СКОПЈЕ)
                const firstCycleObj = await findRegion(event, cities);
                let secondCycleObj;
                // SECOND CYCLE - FIND MORE DETAILS FOR THAT REGION
                if (firstCycleObj.matched === true) {
                  secondCycleObj = await findDetails(firstCycleObj, firstCycleObj.region_city, [
                    extractText.date,
                  ]);
                  // DETERMINE TYPE OF FELONY
                  const typeOfFelony = await findFelony(secondCycleObj.event);
                  // EXTRACT WEATHER FOR THAT DAY OF THE EVENT
                  const weatherObj = await findWeather(
                    secondCycleObj.located_place_second_cycle,
                    secondCycleObj.located_place,
                    secondCycleObj.region_city,
                    secondCycleObj.date
                  );
                  // FINAL OBJECT FOR UPLOAD TO DB
                  const finalObj = {
                    date: secondCycleObj.date,
                    department_region: `СВР ${secondCycleObj.region_city}`,
                    department_city: secondCycleObj.region_city,
                    location: secondCycleObj.located_place_second_cycle
                      ? secondCycleObj.located_place_second_cycle
                      : secondCycleObj.located_place,
                    confidenceScore: Number(secondCycleObj.confidenceScore),
                    event: secondCycleObj.event,
                    coordinates: secondCycleObj.coordinates,
                    felony: typeOfFelony,
                    weather: weatherObj,
                    soruce_link: `https://mvr.gov.mk/izvadok-od-dnevni-nastani/${linkIndex}`,
                  };

                  // UPLOAD TO DATABASE "LOCATED OBJECT"
                  await uploadDB("located", finalObj);
                  console.log(linkIndex);
                } else {
                  // UPLOAD TO DATABASE "NOT LOCATED" OBJECT
                  await uploadDB("not_located", firstCycleObj);
                }
              } else {
                console.log("Skipping event because it is empty or whitespace-only");
              }
            } catch (error) {
              console.error("Error in the first cycle", error);
            }
          }
        } catch (error) {
          console.error("Error", error);
        }
      }

      linkIndex++;
    }
  } catch (error) {
    console.error("Scrape failed", error);
  } finally {
    await browser.close();
    await closeConnection();
  }
};
scrape();
