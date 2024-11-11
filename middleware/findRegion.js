export const prefixes = [
  "СВР",
  "Сектор за внатрешни работи",
  "Секторот за внатрешни работи",
  "ПС",
  "Полициска станица",
  "Полициската станица",
  "ПСОК",
  "ПСОН",
  "ПО",
  "ПК",
  "Полициска канцеларија",
  "Полициската канцеларија",
  "ПКУ",
  "БПС",
  "Полициско одделение",
  "Полициското одделение",
  "ОВР",
  "Одделение за внатрешни работи",
  "Одделението за внатрешни работи",
  "ОКР",
  "ЕВР",
  "криминалистички работи",
  "во",
  "кај",
  "на",
  "општина",
  "територија на град",
  "територија на",
  "во с.",
  "во с",
  "во село",
  "во село.",
  "територија на с",
  "територија на с.",
  "територија на село",
  "територија на село.",
  "кај с",
  "кај с.",
  "кај село",
  "кај село.",
  "патот кон",
  "патот кон с",
  "патот кон с",
  "патот кон сeло",
  "патот кон село.",
  "правец кон",
  "правец кон с",
  "правец кон с",
  "правец кон сeло",
  "правец кон село.",
  "на с",
  "на с.",
  "на село",
  "на село.",
];

export const centarPrefixes = [
  "ПС",
  "Полициска станица",
  "Полициската станица",
  "ПСОК",
  "ПСОН",
  "ПО",
  "ПК",
  "Полициска канцеларија",
  "Полициската канцеларија",
  "ПКУ",
  "БПС",
  "Полициско одделение",
  "Полициското одделение",
  "ОВР",
  "Одделение за внатрешни работи",
  "Одделението за внатрешни работи",
  "ОКР",
  "ЕВР",
];

// export const borderKeywords = /гп|премин|граничниот|гранични|граница/i;

export const borderKeywords = ["гп", "премин", "граничниот", "гранични", "граница"];

const createDepartmentRegex = (prefixes, name) => {
  return new RegExp(prefixes.map((prefix) => `${prefix}[\\s-]?${name}`).join("|"), "i");
};

export const findRegion = async function (event, cities) {
  // Region object
  let regionObj = {
    event: event,
    matched: false,
    confidenceScore: 0,
    region_city: null,
    located_place: null,
    coordinates: 0,
  };
  // FIRST CIRCLE
  // search for department for internal affairs (ex. "СВР Скопје") && ГП/ПРЕМИН/ГРАНИЦА
  for (const city of cities) {
    if (city.department_for_internal_affairs) {
      const departmentRegex = createDepartmentRegex(
        prefixes,
        city.department_for_internal_affairs[0].name
      );
      const borderRegex = new RegExp(`(${borderKeywords.join("|")})`, "i");

      // Test for SVR Skopje/Tetovo/Bitola.
      if (departmentRegex.test(event)) {
        regionObj.matched = true;
        regionObj.confidenceScore = 0.5;
        regionObj.region_city = city.city.city_name;
        regionObj.located_place = city.department_for_internal_affairs[0].name;
        regionObj.coordinates = city.department_for_internal_affairs[0].coordinates;

        return regionObj;
      }
      // Test for SVR Skopje/Tetovo/Bitola... and "ГП/Премин/Граница"
      if (departmentRegex.test(event) && borderRegex.test(event)) {
        regionObj.matched = true;
        regionObj.confidenceScore = "GP";
        regionObj.region_city = city.city.city_name;
        regionObj.located_place = city.department_for_internal_affairs[0].name;
        regionObj.coordinates = city.department_for_internal_affairs[0].coordinates;

        return regionObj;
      }
    }
  }

  // SECOND CIRCLE
  // search for police stations (ex. "Полициска станица Кисела Вода")
  for (const city of cities) {
    if (city.police_station) {
      for (const polStation of city.police_station) {
        //IF CENTAR
        if (polStation.name === "Центар") {
          const centarOnlyRegex = createDepartmentRegex(centarPrefixes, polStation.name);
          if (centarOnlyRegex.test(event)) {
            regionObj.matched = true;
            regionObj.confidenceScore = 0.5;
            regionObj.region_city = city.city.city_name;
            regionObj.located_place = polStation.name;
            regionObj.coordinates = polStation.coordinates;

            return regionObj;
          }
        }
        // IF anything but Centar
        const polStationRegex = createDepartmentRegex(prefixes, polStation.name);
        if (polStationRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.5;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = polStation.name;
          regionObj.coordinates = polStation.coordinates;

          return regionObj;
        }
      }
    }
  }

  // THIRD CIRCLE
  // search for police deparments(ex. "Полициско одделение Кисела Вода")
  for (const city of cities) {
    if (city.police_department) {
      for (const polDepartment of city.police_department) {
        const polDepartmentRegex = createDepartmentRegex(prefixes, polDepartment.name);
        if (polDepartmentRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.5;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = polDepartment.name;
          regionObj.coordinates = polDepartment.coordinates;

          return regionObj;
        }
      }
    }
  }

  //FOURTH CIRCLE
  // search for municipality (ex. "Карпош, Центар")
  for (const city of cities) {
    if (city.municipality) {
      for (const municipality of city.municipality) {
        //IF CENTAR
        if (municipality.name === "Центар") {
          const centarMunicipalityRegex = new RegExp(
            `(општина)\\s*${municipality.name.replace(/[-\s]/g, "[-\\s]*")}`,
            "i"
          );
          if (centarMunicipalityRegex.test(event)) {
            regionObj.matched = true;
            regionObj.confidenceScore = 0.6;
            regionObj.region_city = city.city.city_name;
            regionObj.located_place = municipality.name;
            regionObj.coordinates = municipality.coordinates;

            return regionObj;
          }
        }
        // If any municipality other than Centar
        const municipalityRegex = new RegExp(
          `(во|на|општина|град|населба|кај)\\s*` +
            `${municipality.name.replace(/[-\s]/g, "[-\\s]*")}` +
            `|` + // OR
            `(во|на|кај)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
            `${municipality.name.replace(/[-\s]/g, "[-\\s]*")}` +
            `|` + // OR
            `(кај)\\s*с\\.?\\s*${municipality.name.replace(/[-\s]/g, "[-\\s]*")}`,
          "i"
        );
        if (municipalityRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.6;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = municipality.name;
          regionObj.coordinates = municipality.coordinates;

          return regionObj;
        }
      }
    }
  }

  // FIFTH CIRCLE
  // search for neighborhood (ex. "Капиштец")
  for (const city of cities) {
    if (city.neighborhood) {
      for (const neighborhood of city.neighborhood) {
        if (neighborhood.name === "Центар") {
          const centarNeighborhoodRegex = new RegExp(
            `(населба)\\s*${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}`,
            "i"
          );
          if (centarNeighborhoodRegex.test(event)) {
            regionObj.matched = true;
            regionObj.confidenceScore = 0.6;
            regionObj.region_city = city.city.city_name;
            regionObj.located_place = neighborhood.name;
            regionObj.coordinates = neighborhood.coordinates;

            return regionObj;
          }
        }
        const neighborhoodRegex = new RegExp(
          `(во|на|општина|град|населба|кај)\\s*` +
            `${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}` +
            `|` + // OR
            `(во|на|кај)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
            `${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}` +
            `|` + // OR
            `(кај)\\s*с\\.?\\s*${neighborhood.name.replace(/[-\s]/g, "[-\\s]*")}`,
          "i"
        );

        if (neighborhoodRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.7;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = neighborhood.name;
          regionObj.coordinates = neighborhood.coordinates;

          return regionObj;
        }
      }
    }
  }

  //SIXTH CIRCLE
  // search for villages or smaller cities ("Свети Николе, Марвинци")
  for (const city of cities) {
    if (city.village) {
      for (const village of city.village) {
        const villageRegex = new RegExp(
          `(во|на|општина|град|населба|кај|кон)\\s*` +
            `${village.name.replace(/[-\s]/g, "[-\\s]*")}` +
            `|` +
            `(во|на|кај|кон)\\s*(с\\.?\\s*|с\\s*|село\\.?\\s*|село\\s*)\\s*` +
            `${village.name.replace(/[-\s]/g, "[-\\s]*")}`,
          "i"
        );
        if (villageRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.8;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = village.name;
          regionObj.coordinates = village.coordinates;

          return regionObj;
        }
      }
    }
  }

  //SEVENTH CIRCLE
  // search for regions (ex. "кумановски, скопски, охридски")
  for (const city of cities) {
    if (city.region) {
      for (const region of city.region) {
        const regionRegex = new RegExp(region.name, "i");

        if (regionRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.3;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = region.name;
          regionObj.coordinates = region.coordinates;

          return regionObj;
        }
      }
    }
  }

  //EIGHTH CIRCLE
  // Whole country (ex. "на територија на цела држава/ во Р. Северна Макеодонија")
  for (const city of cities) {
    if (city._id === "Македонија") {
      for (const location of city.region) {
        const locationRegex = new RegExp(location.name, "i");
        if (locationRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.3;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = location.name;
          regionObj.coordinates = location.coordinates;

          return regionObj;
        }
      }
    }
  }

  //NINETH CIRCLE
  // Test for ГП/ГРАНИЧЕН/ПРЕМИН && "Деве Баир"/"Ќафасан"/"Табановце"
  for (const city of cities) {
    if (city.points_of_interest) {
      for (const pointOfInterest of city.points_of_interest) {
        const borderRegex = new RegExp(`(${borderKeywords.join("|")})`, "i");
        const locationRegex = new RegExp(pointOfInterest.name, "i");

        if (borderRegex.test(event) && locationRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = "GP";
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = pointOfInterest.name;
          regionObj.coordinates = pointOfInterest.coordinates;

          return regionObj;
        }
      }
    }
  }

  // STREETS
  for (const city of cities) {
    if (city.street) {
      for (const street of city.street) {
        const streetRegex = new RegExp(
          `(?:ул\\.|бул\\.|улица|булевар)[\\s-]*` +
            `(?:\"|'|„)?` +
            `(?:${street.name})` +
            `(?:\"|'|”)?` +
            `(?:[\\s-]*|$)`,
          "i"
        );
        if (streetRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 1;
          regionObj.region_city = city.city.city_name;
          regionObj.located_place = street.name;
          regionObj.coordinates = street.coordinates;

          return regionObj;
        }
      }
    }
  }

  //ONLY NAME of something (desperately trying to find some match)
  for (const city of cities) {
    // ONLY department_for_internal_affairs.name
    if (city.department_for_internal_affairs) {
      const placeRegex = new RegExp(city.department_for_internal_affairs[0].name, "i");

      if (placeRegex.test(event)) {
        regionObj.matched = true;
        regionObj.confidenceScore = 0.2;
        regionObj.region_city = city.department_for_internal_affairs[0].name;
        regionObj.located_place = city.department_for_internal_affairs[0].name;
        regionObj.coordinates = city.department_for_internal_affairs[0].coordinates;

        return regionObj;
      }
    }
    // ONLY police_department.name
    if (city.police_department) {
      for (const polDepartment of city.police_department) {
        const placeRegex = new RegExp(polDepartment.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = polDepartment.name;
          regionObj.located_place = polDepartment.name;
          regionObj.coordinates = polDepartment.coordinates;

          return regionObj;
        }
      }
    }
    // ONLY police_station.name
    if (city.police_station) {
      for (const polStation of city.police_station) {
        const placeRegex = new RegExp(polStation.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = polStation.name;
          regionObj.located_place = polStation.name;
          regionObj.coordinates = polStation.coordinates;

          return regionObj;
        }
      }
    }
    // ONLY municipality
    if (city.municipality) {
      for (const municipality of city.municipality) {
        const placeRegex = new RegExp(municipality.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = municipality.name;
          regionObj.located_place = municipality.name;
          regionObj.coordinates = municipality.coordinates;

          return regionObj;
        }
      }
    }
    // ONLY municipality
    if (city.neighborhood) {
      for (const neighborhood of city.neighborhood) {
        const placeRegex = new RegExp(neighborhood.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = neighborhood.name;
          regionObj.located_place = neighborhood.name;
          regionObj.coordinates = neighborhood.coordinates;

          return regionObj;
        }
      }
    }
    // ONLY village
    if (city.village) {
      for (const village of city.village) {
        const placeRegex = new RegExp(village.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = village.name;
          regionObj.located_place = village.name;
          regionObj.coordinates = village.coordinates;

          return regionObj;
        }
      }
    }
    // ONLY street
    if (city.street) {
      for (const street of city.street) {
        const placeRegex = new RegExp(street.name, "i");
        if (placeRegex.test(event)) {
          regionObj.matched = true;
          regionObj.confidenceScore = 0.2;
          regionObj.region_city = street.name;
          regionObj.located_place = street.name;
          regionObj.coordinates = street.coordinates;

          return regionObj;
        }
      }
    }
  }

  return regionObj;
};
