const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    dateTime: Date,
});

module.exports = mongoose.model("Appointment", appointmentSchema);

