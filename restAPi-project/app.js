import express from "express";
import path from "path";
import tweets from "./data.js";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(express.static(path.join(process.cwd(), "public")));

// to get all tweets at homepage
app.get("/", (req, res) => {
  res.render("home", { tweets });
});

// to get new tweet form
app.get("/tweets/new", (req, res) => {
  res.render("new");
});

// post req ka use , to create new tweet
app.post("/tweets", (req, res) => {
  const { username, text } = req.body;

  const newTweet = {
    id: Data.now(),
    username,
    text,
  };
  tweets.push(newTweet);
  res.redirect("/");
});
// it will show tweets
app.get("/tweets/:id", (req, res) => {
  const id = Number(req.params.id);
  const tweet = tweets.find((t) => t.id === id);

  res.render("show", { tweet });
});

// idhr form edit hoga

app.get("/tweets/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const tweet = tweets.find((t) => t.id === id);

  res.render("edit", { tweet });
});
// idhr ham update put use krenge

app.put("/tweets/:id", (req, res) => {
  const id = Number(req.params.id);
  const tweet = tweets.find((t) => t.id === id);

  tweet.text = req.body.text;
  res.redirect("/");
});

// idher delete operation ko
app.delete("/tweets/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tweets.findIndex((t) => t.id === id);
  tweets.splice(index, 1);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
