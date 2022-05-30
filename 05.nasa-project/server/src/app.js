/**
 * The App files is created to seperated the express
 * routing logic from server connection
 */

const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.routes");

const app = express();

/**
 * whitelist the server address for client side 
 * to avoid cors policy prompt
 * using cors options
 */
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(planetsRouter);

module.exports = app;
