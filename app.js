const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");//for express sessions, But it only for local projects and not production
const MongoStore = require("connect-mongo");//this is used for production enviornment
const flash = require("connect-flash");
const wrapAsync = require("./utils/wrapAsync.js");


const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/user.js");
const Appointment = require("./models/appointment.js");


const sessionOptions = {
    // store,
    secret: "jabvkjabn",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//here we have set expiry time in milliseconds
      maxAge: 7 * 24 * 60 * 60 * 1000,//
      httpOnly: true,
    },
  };



const { validatecourse, isLoggedIn, isOwner } = require("./middleware.js");

const { reviewSchema } = require("./joi.js");
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("connection successful")
  })
  .catch((err) => console.log(err));

// used to form a connection
async function main() {
  // this is to connect with local 
  await mongoose.connect("mongodb://127.0.0.1:27017/healthcare");

}



app.use(session(sessionOptions));
app.use(flash());

// passort middleware
// this will intialize our password for every request
app.use(passport.initialize());
app.use(passport.session());
// we have to use this every time before using passort
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// middleware to flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  // res.locals.userId= res.locals.currentUser._id;

  next();
});

app.get("/", (req, res) => {
    res.render("home/landingpg.ejs");
  });

// app.use("/", users);




// about
app.get("/about", (req, res) => {
  res.render("home/about.ejs");
});


// Appointment
app.post("/appointment", async (req, res) => {
    try {
        const { name, dateTime } = req.body;
        const newAppointment = new Appointment({ name, dateTime });
        await newAppointment.save();
        res.redirect("doctor.ejs");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

// Start the server
app.listen("8080", (req, res) => {
    console.log("listening on port: 8080");
  });
  

// Login & signup

  app.get("/psignup", (req, res) => {
    res.render("users/Psignup.ejs");
  });
  
  app.post("/psignup", wrapAsync(async (req, res) => {
    try {
      let { username, email,type,image, password } = req.body;
      const newUser = new User({ email,type, username,post,startup,skills,image });
      const registerUser = await User.register(newUser, password);
      //  console.log(registerUser);
  
      // 'req.login' is also a functionallity to login directly after signup built in passport
      // req.login(registerUser, (err) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   req.flash("success", " Welcome to StartHub");
      //   res.redirect("/");
      // });
      req.flash("success", " Welcome to StartHub");
      
    }
    catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }));
  
  app.get("/login", (req, res) => {
    res.render("users/login.ejs");
  });
  
  
  // passort.authenticate is used to check the password
  app.post("/login",
    passport.authenticate("local",
      { failureRedirect: `/login`, failureFlash: true }),
    wrapAsync(async (req, res) => {

        let { username } = req.body;
    
        const registerUser = await User.findOne({ username: username });
        // console.log(registerUser);
        req.flash("success", " Welcome to StartHub");
        // rather than /listing  we will redirect to the page which gave login request
       
        if(res.locals.redirectUrl){
          
          res.redirect(res.locals.redirectUrl);
        }else{
         res.redirect("/");
        }
        
        // res.locals.redirectUrl is defined in Middleware.js
      //  saveRedirectUrl is also defined in middleware.js
    }));
  
  
  app.get("/logout",(req, res, next) => {
    // 'req.logout' is also a functionallity to logout built in passport
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are Logged out");
      res.redirect("/");
    })
  });
