const express = require("express");
const app = express();

const PORT = 3000;

//Middlewares
//requests enters from here.
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Listening On ${PORT}...`);
});
