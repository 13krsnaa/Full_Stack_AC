const express = require("express");

const app = express();

//* Basic middleware *//

app.use((req, res) => {
  let { query } = req.query;
  console.log(query);
  console.log("This is a middleware");
  res.send(
    "I am a middleware and none of your routes will work in fornt of me ",
  );
});

//* basic requests *//
app.get("/", (req, res) => {
  res.send("Hii, i am homepage");
});

app.get("/random", (req, res) => {
  res.send("this is a random page");
});

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
