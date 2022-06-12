const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = await getAllplanets();
        console.log(`${countPlanetsFound.length} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllplanets() {
  /**
   * The first argument is left empty to fetch all data,
   * or insert data name to filter data.
   * Second argument can be use to state the data properties to exclude
   * in our search results
   */
  return await planets.find(
    {},
    {
      _id: 0,
      _V: 0,
    }
  );
}

/**
 * Using Upsert
 *insert + update
 * upsert -- this insert data into a collection if it doesnt already exists
 * but if the data exist it will update that data
 */
async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      { upsert: true }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllplanets,
};

/**
 * Populate node server on startup
 * Here the data would take time before been pipe (stream data)
 * and node js would not wait
 * Hence we are using promises
 * to solve this problem.
 * Here we make the read stream inside a promises
 * then export it to th SERVER file and make it wait before
 * Listening to the Server
 */
