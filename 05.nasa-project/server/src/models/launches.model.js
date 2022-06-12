const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//   flightNumber: 100, //flight_number
//   mission: "Kepler Exploration x", //name
//   rocket: "Kepler-1410 b", //rocket.name
//   launchDate: new Date("December 27, 2030"), //date_local
//   target: "Kepler-1410 b", //notApplicable
//   customer: ["ZTM", "NASA"], //payload.customers for each payload
//   upcoming: true, //upcoming
//   success: true, //success
// };

// saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("Downloading..");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem Downloading Lanuch Data");
    throw new Error("Launch Data Download Failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const lanuching = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    // console.log(`${lanuching.flightNumber} ${lanuching.mission}`);

    await saveLaunch(lanuching);
  }
}

async function loadLaunchData() {
  const findLaunc = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (findLaunc) {
    console.log("Launch data Already Loaded");
    return;
  } else {
    await populateLaunches();
    console.log("Lanuches Saved");
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existLaunchWithId(launchId) {
  return await findLaunch({
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

function getAllaunches(skip, limit) {
  return launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function saveLaunch(launch) {
  const result = await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );

  return result;
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No Matching Planet Found");
  }

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
  loadLaunchData,
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
