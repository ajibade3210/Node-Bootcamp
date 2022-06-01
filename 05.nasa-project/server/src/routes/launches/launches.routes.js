const express = require("express");

const launchesController = require("../../controller/launches.contorller");
const launchesRouter = express.Router();

launchesRouter.get("/", launchesController.httpGetAlllaunches);
launchesRouter.post("/", launchesController.httpAddNewLaunch);
launchesRouter.delete("/:id", launchesController.httpAbortLaunch);

module.exports = launchesRouter;
