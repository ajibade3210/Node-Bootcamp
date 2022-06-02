const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];

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
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

function getAllplanets() {
  console.log(habitablePlanets);
  return habitablePlanets;
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