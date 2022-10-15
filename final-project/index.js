const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const { response } = require("express");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

const app = express();

app.use(cookieParser());

app.use(methodOverride("_method"));

app.use(
  session({ 
    secret: "finalProject0069", 
    saveUninitialized: false, 
    resave: false 
  })
);

const isAuth = (req, res, next) => {
  if(req.session.isAuth){
    next();
  }
  else{
    res.redirect("/sign-in");
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// app.use(cookie());
// app.use(express.json());

var con = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "final-project-back-end"
});
con.getConnection((err, connection) => {
  if(err) throw err;
  console.log("Conntected Database ID: " + connection.threadId);
})



// Landing Page
app.get('/', (req, res) => {
  con.getConnection((err, connection) => {
    connection.query("SELECT * FROM user ORDER by id DESC", (err, result, field) => {
    //   for(let data of result){
    //     console.log(data.username);
    //   }
    //   let userData = {
    //       userID: result[0].id,
    //       userName: result[0].username,
    //       userPwd: result[0].pwd,
    //       userFn: result[0].fname,
    //       userMn: result[0].mname,
    //       userLn: result[0].lname,
    //       userSuffix: result[0].suffix,
    //       userAddress: result[0].address,
    //       userText: result[0].description
    // }
      res.render("home", {
        title: "User List",
        userData: result
      });
    });
});
})

// Sign-up Page
app.get("/sign-up", (req, res) => {
    res.render("sign-up");
})

app.post("/sign-up", (req, res) => {
  let {username, pwd, fname, mname, lname, suffix, address, description} = req.body;

  con.getConnection((err, connection) => {
      connection.query("INSERT INTO user SET username = ?, pwd = ?, fname = ?, mname = ?, lname = ?, suffix = ?, address = ?, description = ?", [username, pwd, fname, mname, lname, suffix, address, description], (err, rows) => {
          var row_id = rows.id;
          connection.release();
          if(!err){
            res.redirect("sign-in");
          }else {
            res.redirect("notfound");
          }
      });
  });
})

// Sing-in Page
app.get("/sign-in", (req, res) => {

  res.render("sign-in");
})

//user Page
app.post("/user", (req, res) => {
  let {username, pwd} = req.body;

  con.getConnection((err, connection) => {
      connection.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
          if(result[0].username !== username || pwd !== result[0].pwd){
            res.redirect("notfound");
          }else {
            req.session.isAuth = true;
            req.session.user = result[0].id;
            const uid = req.session.user;
            req.session.save();
            res.redirect("/user/"+uid);
          }
      });
  });
})

app.get("/user/:id", isAuth, (req, res) => {
  const {id} = req.params;

  con.getConnection((err, connection) => {
      connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result, field) => {
        let userData = {
            userID: result[0].id,
            userName: result[0].username,
            userPwd: result[0].pwd,
            userFn: result[0].fname,
            userMn: result[0].mname,
            userLn: result[0].lname,
            userSuffix: result[0].suffix,
            userAddress: result[0].address,
            userText: result[0].description
      }
      // let userData = [
      //                 result[0].id,
      //                 result[0].username,
      //                 result[0].pwd,
      //                 result[0].fname,
      //                 result[0].mname,
      //                 result[0].lname,
      //                 result[0].suffix,
      //                 result[0].address,
      //                 result[0].description
      // ]

        res.render("user", {userData});
      });
  });
})

app.get("/user/:id/edit", isAuth, (req, res) => {
  const {id} = req.params;

  con.getConnection((err, connection) => {
      connection.query("SELECT * FROM user WHERE id = ?", [id], (err, result, field) => {
        let userData = {
            userID: result[0].id,
            userName: result[0].username,
            userPwd: result[0].pwd,
            userFn: result[0].fname,
            userMn: result[0].mname,
            userLn: result[0].lname,
            userSuffix: result[0].suffix,
            userAddress: result[0].address,
            userText: result[0].description
      }

        res.render("user/edit", {userData});
      });
  });
})

app.post("/user/:id", (req, res) => {
  const {id} = req.params;
  let {username, pwd, fname, mname, lname, suffix, address, description} = req.body;

  con.getConnection((err, connection) => {
    connection.query("UPDATE user SET username = ?, pwd = ?, fname = ?, mname = ?, lname = ?, suffix = ?, address = ?, description = ? WHERE id = ?", [username, pwd, fname, mname, lname, suffix, address, description, id], (err, rows) => {
        
        connection.release();
        if(!err){
          res.redirect("/user/"+id);
          
        }else {
          throw err;
        }
    });
  });
})


app.post("/delete/:id",  (req, res) => {
  const {id} = req.params;

  con.getConnection((err, connection) => {
    connection.query("DELETE FROM user WHERE id = ?", [id], (err, rows) => {
        res.render("delete");
    });
  });
})

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err) throw err;
    res.redirect("/sign-in");
  });
});



app.get("*", (req, res) => {
    res.render("notfound");
})

app.listen(3000, () => {
    console.log(`App is listening at http://locahost:3000`);
  });