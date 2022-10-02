//Import Express
const express = require("express");
const path = require("path");
const redditData = require("./data.json");

console.log(redditData);

//Execute Express
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//Home Page Route
app.get('/', (req, res) => {
    res.render("home");
})

app.get("/cats", (req, res) => {
    // Array like database
    const cats = [
        "Munig", "Chi-chi", "Garfield", "Ming-ming"
    ];
    res.render("cats", {cats});
})

app.get('/r/:subreddit', (req, res) => {
    const {subreddit} = req.params;
    const data = redditData[subreddit];
    // res.render("subreddit", {subreddit}); to subreddit.ejs
    res.render("subreddit", {...data}); //spread operator
})

app.get('/rand', (req, res) => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    res.render("random", {randomNum});
})

app.listen(3000, () => {
    console.log("Listening on port");
})