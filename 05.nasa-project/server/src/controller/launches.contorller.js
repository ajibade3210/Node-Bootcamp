const lanuchesModel = require("../models/launches.model");

function httpGetAlllaunches(req, res) {
  return res.status(200).json(launchesModel.getAlllaunches());
}

module.exports = {
  httpGetAlllaunches,
};
