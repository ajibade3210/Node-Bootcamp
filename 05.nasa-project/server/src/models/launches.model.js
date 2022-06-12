const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Kepler-1410 b",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-1410 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// saveLaunch(launch);

async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestlaunch = await launchesDatabase.findOne({}).sort("-flightNumber");

  if (!latestlaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestlaunch.flightNumber;
}

function getAllaunches() {
  return launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No Matching Planet Found");
  }

  const result = await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );

  console.log("result", launch.flightNumber);
  return result;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });
  console.log("Hereee", await saveLaunch(newLaunch));
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  existLaunchWithId,
  getAllaunches,
  scheduleNewLaunch,
  abortLaunchById,
};

/**
 * {
 *"mission": "ZTM155",
 "rocket": "ZTM Experimental IS1",
 "destination": "Kepler-186 f",
 "launchDate": "january 17, 2032"
 * }
 */
