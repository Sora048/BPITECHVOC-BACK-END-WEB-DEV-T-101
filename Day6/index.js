//Import Express
const express = require("express");
const path = require("path");
// const redditData = require("./data.json");

//Execute Express
const app = express();

// app.use(express.static(path.join(__dirname), "/public"));
app.use(express.static("public")); //get the path of app.css in publc folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//Home Page Route
app.get('/', (req, res) => {
    res.render("home");
})

app.get("/contact", (req, res) => {
    
    const contact = {
        Mobile: "09455874532",
        Email: "kasutoro048@gmail.com"
    }
    res.render("contact", {contact});
})

app.get('/about', (req, res) => {
    const about = {
        Field: "Web Developer",
        Job: "none"
    }
    res.render("about", {about});
})


app.get("*", (req, res) => {
    res.render("notfound");
})


app.listen(3000, () => {
    console.log("Listening on port");
})