const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Joi = require("joi");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const listings = require("./routes/listing.js");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
main()
  .then(() => {
    console.log("Connection Established with the database.");
  })
  .catch((e) => {
    console.log(e);
  });

//Function to connect to mongoDB
async function main() {
  await mongoose.connect(MONGO_URL);
}

//Schema Validation Function Using JOI
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Routes
app.use("/listings", listings);

//Root Index
app.get("/", (req, res) => {
  res.render("listings/root.ejs");
});

//Reviews
//Post Review Route
app.post(
  "/listings/:id/review",
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
  })
);

//Delete Review Route
app.delete(
  "/listings/:listingId/review/:reviewId",
  wrapAsync(async (req, res) => {
    let { listingId, reviewId } = req.params;

    await Listing.findByIdAndUpdate(listingId, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${listingId}`);
  })
);

//Incorrect Route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found !"));
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "New Villa",
//     description: "By the Beach",
//     price: "1200",
//     location: "Calangute ,Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("Saved data");
//   res.send("success");
// });

//Middlewares
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong !!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
