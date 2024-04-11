const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

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
