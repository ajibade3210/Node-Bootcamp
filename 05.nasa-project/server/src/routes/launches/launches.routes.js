const express = require("express");

const launchesController = require("../../controller/launches.contorller");
const launchesRouter = express.Router();

launchesRouter.get("/launches", launchesController.httpGetAlllaunches);

module.exports = launchesRouter;
