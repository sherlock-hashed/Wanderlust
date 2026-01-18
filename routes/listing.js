const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {listingSchema} = require("../schema.js");
const {reviewSchema} = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js");

const multer  = require('multer');

const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })


// const validateListing = (req,res,next)=>{
//     let {error} =listingSchema.validate(req.body);
    
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",")
//         throw new ExpressError(400,errMsg);
//     } else{
//         next();
//     }
// }


// INDEX ROUTE
// router.get("/", wrapAsync(listingController.index)) 

// NEW ROUTE
// router.get("/new",isLoggedIn,listingController.renderNewForm)


// SHOW ROUTE
// router.get("/:id",wrapAsync(listingController.showListing)) 

//CREATE ROUTE
// router.post("/", isLoggedIn,validateListing ,wrapAsync(listingController.createListing)) 

// //Edit Route
// router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)); 
  
//Update Route
  // router.put("/:id", isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing)); 

// DELETE ROUTE
// router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); 

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing)) 
  

// NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm)

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) 
  .put( isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
  .delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); 

  //Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)); 
// // EDIT ROUTE

// app.get("/listings/:id/edit",async(req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("./listings/edit.ejs",{listing})
// })

// //UPDATE ROUTE
// app.put("/listings/:id",async (req,res)=>{
//     let {id} = req.params ;
//     let updateListing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`)
// })


module.exports = router ;