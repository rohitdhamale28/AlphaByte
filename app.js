const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Appointment = require(".models/appointment.js");

app.set("view engine", "html");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/appointment");
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
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
