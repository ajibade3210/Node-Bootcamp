const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];
const isNotInffectedCountries = [];

// function isNotInffectedCountry(country) {
//   return country.New_deaths === 0;
// }

fs.createReadStream("covid-global.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  ) //parse
  .on("data", (data) => {
    results.push(data);
    results.map((data) => {
      if (data.New_deaths == 0) {
        console.log(data.Country);
      }
    });
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    // console.log(results);
    console.log(`${isNotInffectedCountries.length} countries not infected`);
  });
