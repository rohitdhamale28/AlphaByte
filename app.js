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
const Appointment = require(".models/appointment.js");


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

  // all the user route are stored in this file
const courses = require("./routes/user.js");

// all the appointment route are stored in this file
const reviews = require("./routes/appointment.js");

const { validatecourse, isLoggedIn, isOwner } = require("./middleware.js");

const { reviewSchema } = require("./joi.js");
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/healthcare");
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
app.listen(8080, () => {
    console.log("Server is running on port 3000");
});
