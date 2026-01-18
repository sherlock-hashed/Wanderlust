const express = require("express");
const app = express();
// const users = require("./routes/user.js");
// const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const flash = require("connect-flash")

app.set("view engine","ejs")
const path = require("path")

const sessionOptions = {
    secret: 'mysupersecretstring', // required option
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }

app.use(session(sessionOptions));
app.use(flash());


app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    req.session.name = name ;
    console.log(req.session.name)
    // res.send(`Hey! It's ${name}`)
    req.flash("success","User Registered Successfully")
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    // res.send(`Hello! ${req.session.name}`)
    res.locals.msg = req.flash("success");
    res.render("page.ejs",{name:req.session.name})
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++ ;
//     } else{
//         req.session.count = 1;
//     }

//     res.send(`YOu sent a request ${req.session.count} times`)
// })

// app.get("/test",(req,res)=>{
//     res.send("Test Successful");
// })

app.listen(3000,()=>{
    console.log("Server Listing to Port 3000");
})