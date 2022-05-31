const express = require("express");
const planetsController = require("../../controller/planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/planets", planetsController.httpGetAllPlanets);

module.exports = planetsRouter;
