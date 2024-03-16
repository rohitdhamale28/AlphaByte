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
const Blog = require("./models/blog.js");
const StartUp = require("./models/startup.js");
const Appointment = require(".models/appointment.js");

app.set("view engine", "html");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/healthcare");
}


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
