// look further into that city to find better match (neighborhood, municipality, village, street)
import { client } from "../mongoDB/connectToMongo.js";
import { prefixes, centarPrefixes } from ".//findRegion.js";

const borderKeywords = /гп|премин|граница/i;

const createDepartmentRegex = (prefixes, name) => {
  return new RegExp(prefixes.map((prefix) => `${prefix}[\\s-]?${name}`).join("|"), "i");
};

// Find only the region city from all the cities
const fetchCityObj = async function (query) {
  const db = client.db("locations");
  const citiesCollection = db.collection("cities");
  const foundedCity = await citiesCollection.findOne(query);

  return foundedCity;
};

export const findDetails = async function (obj, city, date) {
  //Fetch the region object where the event happened to look further for more details
  const query = { _id: city };
  const foundedCity = await fetchCityObj(query);

  let detailsObj = {
    date: new Date(date).toISOString().split("T")[0],
    event: obj.event,
    matchedFirstCycle: obj.matched,
    matchedSecondCycle: false,
    matchedPlace: null,
    confidenceScore: obj.confidenceScore,
    region_city: obj.region_city,
    located_place: obj.located_place,
    located_place_second_cycle: null,
    coordinates: obj.coordinates,
  };

  // IF CONFIDENCE SCORE < 0.6
  if (detailsObj.confidenceScore < 0.6 && foundedCity.police_station) {
    for (const polStation of foundedCity.police_station) {
      //IF CENTAR
      if (polStation.name === "Центар") {
        const centarOnlyRegex = createDepartmentRegex(centarPrefixes, polStation.name);
        if (centarOnlyRegex.test(detailsObj.event)) {
          detailsObj.matchedSecondCycle = true;
          detailsObj.confidenceScore = 0.6;
          detailsObj.matchedPlace = "Police station";
          detailsObj.located_place_second_cycle = polStation.name;
          detailsObj.coordinates = polStation.coordinates;

          break;
        }
      }
      // IF anything but Centar
      const polStationRegex = createDepartmentRegex(prefixes, polStation.name);
      if (polStationRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 0.6;
        detailsObj.matchedPlace = "Police station";
        detailsObj.located_place_second_cycle = polStation.name;
        detailsObj.coordinates = polStation.coordinates;

        break;
      }
    }
  }

  // IF CONFIDENCE SCORE < 0.6 || GP || Airport
  if (detailsObj.confidenceScore === "GP" && foundedCity.points_of_interest) {
    for (const pointOfInterest of foundedCity.points_of_interest) {
      // Regex for GP and Airport
      const pointOfInterestRegex = new RegExp(pointOfInterest.name, "i");
      const city = foundedCity._id;
      const airportCityRegex = new RegExp("меѓународен аеродром", "i");

      // If the text containts some of the point of interest name
      if (pointOfInterestRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 1;
        detailsObj.matchedPlace = "Point of interest - GP";
        detailsObj.located_place_second_cycle = pointOfInterest.name;
        detailsObj.coordinates = pointOfInterest.coordinates;
        break;
        // If the text containts airport "city.name" - Аеордром Скопје, Охрид
      } else if (
        airportCityRegex.test(detailsObj.event) &&
        pointOfInterestRegex.test(detailsObj.event)
      ) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 1;
        detailsObj.matchedPlace = "Point of interest - Airport";
        detailsObj.located_place_second_cycle = city;
        detailsObj.coordinates = foundedCity.pointOfInterest.coordinates;
        break;
      }
    }
  }

  // IF CONFIDE SCORE < 0.6 && POLICE DEPARTMENT IS PRESENT
  if (detailsObj.confidenceScore < 0.6 && foundedCity.police_department) {
    for (const polDepartment of foundedCity.police_department) {
      const polDepartmentRegex = createDepartmentRegex(prefixes, polDepartment.name);
      if (polDepartmentRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 0.6;
        detailsObj.matchedPlace = "Police department";
        detailsObj.located_place_second_cycle = polDepartment.name;
        detailsObj.coordinates = polDepartment.coordinates;

        break;
      }
    }
  }

  // IF CONFIDENCE SCORE < 0.7 && MUNICIPALITY IS PRESENT
  if (detailsObj.confidenceScore < 0.7 && foundedCity.municipality) {
    for (const municipality of foundedCity.municipality) {
      if (municipality.name === "Центар") {
        const centarMunicipalityRegex = new RegExp(
          `(општина)\\s*${municipality.name.replace(/[-\s]/g, "[-\\s]*")}`,
          "i"
        );
        if (centarMunicipalityRegex.test(detailsObj.event)) {
          detailsObj.matchedSecondCycle = true;
          detailsObj.confidenceScore = 0.7;
          detailsObj.matchedPlace = "Municipality";
          detailsObj.located_place_second_cycle = municipality.name;
          detailsObj.coordinates = municipality.coordinates;

          break;
        }
      }
      const municipalityRegex = new RegExp(
        `(во|на|општина|град|населба|кај)\\s*` +
          `${municipality.name.replace(/[-\s]/g, "[-\\s]*")}` +
          `|` +
          `(во|на|кај)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
          `${municipality.name.replace(/[-\s]/g, "[-\\s]*")}` +
          `|` + // OR
          `(кај)\\s*с\\.?\\s*${municipality.name.replace(/[-\s]/g, "[-\\s]*")}`,
        "i"
      );
      if (municipalityRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 0.7;
        detailsObj.matchedPlace = "Municipality";
        detailsObj.located_place_second_cycle = municipality.name;
        detailsObj.coordinates = municipality.coordinates;

        break;
      }
    }
  }

  // IF CONFIDENCE SCORE < 0.8 && NEIGHBORHOOD IS PRESENT
  if (detailsObj.confidenceScore < 0.8 && foundedCity.neighborhood) {
    for (const neighborhood of foundedCity.neighborhood) {
      if (neighborhood.name === "Центар") {
        const centarNeighborhoodRegex = new RegExp(
          `населба\\s*${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}`,
          "i"
        );
        if (centarNeighborhoodRegex.test(detailsObj.event)) {
          detailsObj.matchedSecondCycle = true;
          detailsObj.confidenceScore = 0.8;
          detailsObj.matchedPlace = "Neighborhood";
          detailsObj.located_place_second_cycle = neighborhood.name;
          detailsObj.coordinates = neighborhood.coordinates;
          break;
        }
      }
      const neighborhoodRegex = new RegExp(
        `(во|на|општина|град|населба|кај)\\s*` +
          `${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}` +
          `|` +
          `(во|на|кај)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
          `${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}` +
          `|` +
          `(кај)\\s*с\\.?\\s*${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}`,
        "i"
      );

      if (neighborhoodRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 0.8;
        detailsObj.matchedPlace = "Neighborhood";
        detailsObj.located_place_second_cycle = neighborhood.name;
        detailsObj.coordinates = neighborhood.coordinates;
        break;
      }
    }
  }

  // IF CONFIDENCE SCORE < 0.9 && VILLAGE IS PRESENT
  if (detailsObj.confidenceScore < 0.9 && foundedCity.village) {
    for (const village of foundedCity.village) {
      const villageRegex = new RegExp(
        `(во|на|општина|град|населба|кај|кон)\\s*` +
          `${village.name.replace(/[-\s]/g, "[-\\s]*")}` +
          `|` + // OR
          `(во|на|кај|кон)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
          `${village.name.replace(/[-\s]/g, "[-\\s]*")}`,
        "i"
      );
      if (villageRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 0.9;
        detailsObj.matchedPlace = "Village";
        detailsObj.located_place_second_cycle = village.name;
        detailsObj.coordinates = village.coordinates;
        break;
      }
    }
  }

  // IF CONFIDENCE SCORE < 1 && STREET IS PRESENT
  if (detailsObj.confidenceScore < 1 && foundedCity.street) {
    for (const street of foundedCity.street) {
      const streetRegex = new RegExp(
        `(?:ул\\.|бул\\.|улица|булевар)[\\s-]*` +
          `(?:\"|)?` +
          `(?:\\s*|)?` +
          `(?:${street.name})` +
          `(?:\"|)?` +
          `(?:\\s*|$)`,
        "i"
      );

      if (streetRegex.test(detailsObj.event)) {
        detailsObj.matchedSecondCycle = true;
        detailsObj.confidenceScore = 1;
        detailsObj.matchedPlace = "Street";
        detailsObj.located_place_second_cycle = street.name;
        detailsObj.coordinates = street.coordinates;
        break;
      }
    }
  }

  return detailsObj;
};
