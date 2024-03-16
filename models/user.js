const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.430452632.1708180075&semt=sph",
        //   set: (v)=> v==="" ? "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.430452632.1708180075&semt=sph": v,
    },
    education: {
        type: String,

    },
    type: {
        type: String,

    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        }
    ],
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    doctors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", doctorSchema);