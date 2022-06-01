const { getAllplanets } = require("../models/planets.model");

/**
 *
 */
function httpGetAllPlanets(req, res) {
  console.log(getAllplanets);
  return res.status(200).json(getAllplanets());
}

module.exports = {
  httpGetAllPlanets,
};
