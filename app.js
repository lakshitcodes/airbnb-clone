const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

//Routes

//Root Index
app.get("/", (req, res) => {
  res.render("listings/root.ejs");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  let { title, description, image, price, location, country } = req.body;
  let listing = new Listing({
    title: title,
    description: description,
    image: image,
    price: price,
    location: location,
    country: country,
  });
  await listing
    .save()
    .then(() => {
      res.redirect("/listings");
    })
    .catch((e) => {
      console.log(e);
      res.send(
        "Some error occured while listing your property !! \n Please try again."
      );
    });
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update in DB
app.patch("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = req.body.listing;
  await Listing.findByIdAndUpdate(id, { ...listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
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

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
