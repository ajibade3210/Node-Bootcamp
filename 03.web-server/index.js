const http = require("http");

const PORT = 4000;

const friends = [
  {
    id: 1,
    name: "Emeka Jason",
  },
  {
    id: 2,
    name: "Ade Jason",
  },
  {
    id: 3,
    name: "Musa Jason",
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");

  //CREATE A NEW FRIEND
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request: ", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  }
  //Fetch Friends
  else if ((req.method === "GET", items[1] === "friends")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friendIndex = Number(items[2]); //+items[2]
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === "message") {
    res.setHeader("Content-Type", "text/Html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Jason</li>");
    res.write("<li>What are your thoughts on astronomy</li>");
    res.write("<ul>");
    res.write("<body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => console.log("Listening On Port " + PORT)); //127.0.0.1 => localhost

// res.writeHead(200, {
//   "Content-Type": "application/json", //specific type of response
// });

// fetch("http://localhost:3000/friends", {
//     method:"POST",
//     body: JSON.stringify({id:3, name: "Waheed jason"})
// })
