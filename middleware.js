// const Course = require("./models/course.js");
// const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema} = require("./joi.js");

// //  Validation for Schema: Converting joi function into middleware
// module.exports.validatecourse = (req, res, next) => {
//     let { error } = courseSchema.validate(req.body);
//     if (error) {
//         // this is the error message with error details
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };


// module.exports.validatereview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body);
//     if (error) {
//       // this is the error message with error details
//       let errMsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
//   };

module.exports.isLoggedIn= (req,res,next)=> {


    if(!req.isAuthenticated()){
      // create a new parameter in req.session (redirectUrl) which has all info of session to pass the url from which we got the login request
      req.session.redirectUrl= req.originalUrl;
      req.flash("error","You are not Loged In");
     return res.redirect("/login");
    }
   next();
}




module.exports.saveRedirectUrl= (req,res,next) =>{
   
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();

};

// middleware to check wether the logged in user is the owner
// module.exports.isOwner= async(req,res,next) =>{
//     let { id } = req.params;
//     let courses = await Course.findById(id);
//     if(   !courses.owner._id.equals(res.locals.currentUser._id)){
//         req.flash("error","You don't have the premission");
//         // when error you have to use return after it or else the rest functions will also get executed
//         return res.redirect(`/courses/${id}`);    
//      }
//     next();

// };

// module.exports.isReviewAuthor= async(req,res,next) =>{
//     let {id, reviewId } = req.params;
//     let reviewcourses = await Review.findById(reviewId);
//     let courses = await Course.findById(id);

//     if(  !courses.owner._id.equals(res.locals.currentUser._id) && !reviewcourses.author._id.equals(res.locals.currentUser._id)){
//         req.flash("error","You are not the author of this review");
//         // when error you have to use return after it or else the rest functions will also get executed
//         return res.redirect(`/courses/${id}`);    
//      }
//     next();

// };
