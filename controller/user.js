// this file has all the listing route functions
// this is done to structure our project in mvc format
// MVC : Models-Views-Controller
const Review = require("../models/review.js");
const Course = require("../models/course.js");
const User = require("../models/user.js");


module.exports.signup=async (req, res) => {
    try {
      let { username, email,type,post,startup,skills,image, password } = req.body;
      const newUser = new User({ email,type, username,post,startup,skills,image });
      const registerUser = await User.register(newUser, password);
      //  console.log(registerUser);
  
      // 'req.login' is also a functionallity to login directly after signup built in passport
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", " Welcome to StartHub");
        res.redirect("/");
      });
  
    }
    catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };

module.exports.login=async (req, res) => {

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
};

module.exports.logout= (req, res, next) => {
    // 'req.logout' is also a functionallity to logout built in passport
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are Logged out");
      res.redirect("/");
    })
  }
