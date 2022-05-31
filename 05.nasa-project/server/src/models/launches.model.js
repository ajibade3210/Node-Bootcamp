/**
 *Using Map in Javascript

*/
const launches = new Map();

let lastFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  lanuchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAlllaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastestFlightNumber++;
  launches.set(
    launches.flightNumber,
    Obeject.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mastery", "NASA"],
      flightNumber: lastestFlightNumber,
    })
  );
}

module.exports = {
  getAlllaunches,
  addNewLaunch,
};

/**
 * {
 *"mission": "ZTM155",
 "rocket": "ZTM Experimental IS1",
 "destination": "Kepler-186 f",
 "launchDate": "january 17, 2032"
 * }
 */
