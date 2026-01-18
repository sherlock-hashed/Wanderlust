if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// require('dotenv').config();
// console.log(process.env.SECRET);

const express = require("express");
const app = express();

const  mongoose = require("mongoose");

const ejs = require("ejs");
const path = require("path")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

const methodOverride = require("method-override")
app.use(methodOverride("_method"))

const ejsMate = require("ejs-mate")
app.engine("ejs",ejsMate)

app.use(express.static("public"))

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


const Listing = require("./models/listing.js")
const Review = require ("./models/review.js")

const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js")

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");

const flash = require("connect-flash")

const sessionOptions = {
    secret:"mysecret",
    resave:false,
    saveUninitialized : true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

// app.get("/",(req,res)=>{
//     res.send("Home Page")
// })


const dbUrl = process.env.ATLASDB_URL;

main()
    .then(()=>{
        console.log("Connected To DataBase")
    })
    .catch(err => console.log(err));
    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
        // await mongoose.connect(dbUrl);
}

const validateListing = (req,res,next)=>{
    let {error} =listingSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
}

const validateReview = (req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
}

let port=8080;

app.listen(port,()=>{
    console.log(`App Listening to ${port}`)
})


// app.get("/testListing",async (req,res)=>{
    //     // let sampleListing = new Listing({
        //     //     title:"My New Villa",
        //     //     description:"Beach Facing",
        //     //     price:1200,
        //     //     location:"Calangute,Goa",
        //     //     country:"India"
        //     // })
        
        //     // await sampleListing.save();
        //     console.log("Sample was Saved")
        //     res.send("Listing Saved")
// })

// // INDEX ROUTE
// router.get("/listings", wrapAsync(async (req,res)=>{
    //     const allListings = await Listing.find({});
    //     res.render("./listings/index.ejs",{allListings})
    // })
    // ) 
    
// // NEW ROUTE
// router.get("/listings/new",(req,res)=>{
    //     res.render("./listings/new.ejs")
    // })

    // // SHOW ROUTE
    // router.get("/listings/:id",wrapAsync(async(req,res)=>{
        //     let {id} = req.params;
        //     const listing = await Listing.findById(id).populate("reviews");
        //     res.render("./listings/show.ejs",{listing})
//    })) 

// //CREATE ROUTE
// router.post("/listings", validateListing ,wrapAsync(async (req,res,next)=>{
    //     // let listing = req.body.listing;
    
//         // if(!req.body.listing){
//         //     throw new ExpressError(400,"Send Valid Data for Listing");
//         // } 

//         const newListing = new Listing(req.body.listing)
//         await newListing.save();
//         res.redirect("/listings");

// })) 

// // // EDIT ROUTE

// // app.get("/listings/:id/edit",async(req,res)=>{
// //     let {id} = req.params;
// //     const listing = await Listing.findById(id);
// //     res.render("./listings/edit.ejs",{listing})
// // })

// // //UPDATE ROUTE
// // app.put("/listings/:id",async (req,res)=>{
// //     let {id} = req.params ;
// //     let updateListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
// //     res.redirect(`/listings/${id}`)
// // })

// //Edit Route
// router.get("/listings/:id/edit", wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
//   })); 

//   //Update Route
//   router.put("/listings/:id", validateListing,wrapAsync( async (req, res) => {
    //     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
//   })); 

// // DELETE ROUTE
// router.delete("/listings/:id", wrapAsync(async (req, res) => {
    //     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
//   })); 

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
})
// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User ({
//         email:"student@gmail.com",
//         username:"Student"
//     });
//     let registeredUser = await User.register(fakeUser,"hello")
//     res.send(registeredUser)
// })


app.use("/listings",listingRouter) ;
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter)


// // Reviews 
// // POST Review ROUTE
// app.post("/listings/:id/reviews",validateReview, wrapAsync(async (req,res)=>{
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review)
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`)
// })) 

// // DELETE Review Route
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res,next)=>{
//     let {id,reviewId} = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// })) 


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong!"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message})
  })