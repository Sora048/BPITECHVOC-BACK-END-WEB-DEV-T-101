const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("<h1><i>Welcom to our Homepage</i></h1>");
})

app.get("/r/:subreddit/:postId", (req, res) => {
    // console.log(req.param);
    const {subreddit, postId} = req.params;
    res.send(`Viewing post Id ${postId} on ${subreddit} subreddit`);
})

app.get("/cats", (req, res) => {
    res.send("Meow!");
})

app.get("/dogs", (req, res) => {
    res.send("arf!");
})

app.get("/search/", (req, res) => {
    const {q} = req.query;
    if(!q) {
        res.send("Nothing found, well played!");
    }
})

// app.post("/cats", (req, res) => {
//     res.send("Meow!");
// })

// app.post("/dogs", (req, res) => {
//     res.send("arf!");
// })

app.get("*", (req, res) => {
    res.send("<h1><i>Unknown Path</i></h1>");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

// https://www.reddit.com