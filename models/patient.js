const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Search for passport ;
// passport-local-mongoose, it is a tool which already set iin builts code for user login 
// it's usefull for login and password and has inbuilt hash functions and salts

// passort automatically save a user name if we don't provide it
const patientSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.430452632.1708180075&semt=sph",
        //   set: (v)=> v==="" ? "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.430452632.1708180075&semt=sph": v,
    },
   
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        }
    ],
    
    
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patient", patientSchema);