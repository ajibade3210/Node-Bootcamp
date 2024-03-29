const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://ajibade:f4QlUoB5R0nNtS8Y@nasacluster.yfmahhj.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB COnnected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening On Port ${PORT}....`);
  });
}

startServer();
