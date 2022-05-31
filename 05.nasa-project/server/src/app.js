/**
 * The App files is created to seperated the express
 * routing logic from server connection
 */
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.routes");
const launchesRouter = require("./routes/launches/launches.routes");

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

/**
 * Using Morgan to logs all use activities
 * logs the users requests types, response, oc type etc.
 */
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(planetsRouter);
app.use(launchesRouter);

/**
 * "/*" Helps Match every endpoints from the client side  for the server side to
 * route effectively to them
 */
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
