const express = require("express");

const bookRoute = require("./routes/books.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoute);

const PORT = 8091;

app.listen(PORT, () => {
  console.log("Listening On Port: " + PORT);
});
