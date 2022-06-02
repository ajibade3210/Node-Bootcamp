const launchesModel = require("../models/launches.model");

function httpGetAlllaunches(req, res) {
  return res.status(200).json(launchesModel.getAlllaunches());
}

function httpAddNewLaunch(req, res) {
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

  launchesModel.addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  //If launch does not exist
  if (!launchesModel.existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch no found",
    });
  }

  const aborted = launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAlllaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
