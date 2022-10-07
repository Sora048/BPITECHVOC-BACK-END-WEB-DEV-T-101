const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const tweets = [
    {
        id: uuidv4(),
        username: "User1",
        tweet: "How is the Weekend"
    },
    {
        id: uuidv4(),
        username: "User2",
        tweet: "Hottest Day in -ber months"
    },
    {
        id: uuidv4(),
        username: "User3",
        tweet: "Job hunting is hard"
    },
    {
        id: uuidv4(),
        username: "User4",
        tweet: "Feeling uneasy"
    }
];

// Form to create tweet
app.get("/tweets/new", (req, res) => {
    res.render("tweets/new");
})

//Create Tweet
app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    tweets.push({username, tweet, id: uuidv4()});
    res.redirect("/tweets");
})

// Show Route - view details of specific tweets
app.get("/tweets/:id", (req, res) => {
    const {id} = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render("tweets/show", {tweet});
})

//Update specific tweet
app.patch("/tweets/:id", (req, res) => {
    const {id} = req.params;
    const newTweetText = req.body.tweet;
    let foundTweet = tweets.find(t => t.id === id);
    foundTweet.tweet = newTweetText;
    res.redirect("/tweets");
})

//Form to edit existing tweet
app.get("/tweets/:id/edit", (req, res) => {
    const {id} = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render("tweets/edit", {tweet});
})

//READ all tweets
app.get("/tweets", (req, res) => {
    res.render("tweets/index", {tweets});
})

// app.post("/fruit", (req, res) => {
//     const {nameOfFruit, qty} = req.body;
//     if(qty > 1){
//         res.send(`Here are your ${qty} ${nameOfFruit}`);
//     } else {
//         res.send(`Here are your ${qty} ${nameOfFruit}`);
//     }
//     res.send("Get /fruit response");
// })

app.listen(3000, () => {
    console.log("Port 3000...");
})