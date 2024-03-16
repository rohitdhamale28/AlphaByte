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
    prescription:{
        url:String,
        filename: String,
            // type:String,
            // default:"https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            // set: (v)=> v==="" ? "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            //  : v,
     },
    
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);