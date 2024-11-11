import { client } from "../mongoDB/connectToMongo.js";

const db = client.db("weather");
const weatherCollection = db.collection("weather");

export const findWeather = async function (firstLocation, secondLocation, region_city, date) {
  let firstLocationQuery = { city_name: firstLocation, date: date };
  const WeatherForTheDayFirstLocation = await weatherCollection.findOne(firstLocationQuery);
  let secondLocationQuery = { city_name: secondLocation, date: date };
  const WeatherForTheDaySecondLocation = await weatherCollection.findOne(secondLocationQuery);
  let cityQuery = { city_name: region_city, date: date };
  const WeatherForTheDayCity = await weatherCollection.findOne(cityQuery);

  if (WeatherForTheDayFirstLocation) {
    const weatherObj = {
      tavg: WeatherForTheDayFirstLocation.weather.tavg,
      tmin: WeatherForTheDayFirstLocation.weather.tmin,
      tmax: WeatherForTheDayFirstLocation.weather.tmax,
      snow: WeatherForTheDayFirstLocation.weather.snow,
      wdir: WeatherForTheDayFirstLocation.weather.wdir,
      wspd: WeatherForTheDayFirstLocation.weather.wspd,
      pres: WeatherForTheDayFirstLocation.weather.pres,
    };
    return { weatherObj };
  }

  if (WeatherForTheDaySecondLocation) {
    const weatherObj = {
      tavg: WeatherForTheDaySecondLocation.weather.tavg,
      tmin: WeatherForTheDaySecondLocation.weather.tmin,
      tmax: WeatherForTheDaySecondLocation.weather.tmax,
      snow: WeatherForTheDaySecondLocation.weather.snow,
      wdir: WeatherForTheDaySecondLocation.weather.wdir,
      wspd: WeatherForTheDaySecondLocation.weather.wspd,
      pres: WeatherForTheDaySecondLocation.weather.pres,
    };
    return { weatherObj };
  }

  if (WeatherForTheDayCity) {
    const weatherObj = {
      tavg: WeatherForTheDayCity.weather.tavg,
      tmin: WeatherForTheDayCity.weather.tmin,
      tmax: WeatherForTheDayCity.weather.tmax,
      snow: WeatherForTheDayCity.weather.snow,
      wdir: WeatherForTheDayCity.weather.wdir,
      wspd: WeatherForTheDayCity.weather.wspd,
      pres: WeatherForTheDayCity.weather.pres,
    };
    return { weatherObj };
  }

  return { message: "Weather data not found for the specified city and date." };
};
