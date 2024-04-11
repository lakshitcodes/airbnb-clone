const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "New Villa",
    description: "By the Beach",
    price: "1200",
    location: "Calangute ,Goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("Saved data");
  res.send("success");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
