const launchesModel = require("../models/launches.model");

async function httpGetAlllaunches(req, res) {
  return res.status(200).json(await launchesModel.getAllaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing Required Lanuch Property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }

  await launchesModel.scheduleNewLaunch(launch);
  console.log("HAAerr", launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  //If launch does not exist
  const existsLaunch = await launchesModel.existLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await launchesModel.abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  } else {
    return res.status(200).json({
      ok: true,
    });
  }
}

module.exports = {
  httpGetAlllaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
