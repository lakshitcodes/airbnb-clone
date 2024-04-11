const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then(() => {
    console.log("Connection Established with the DB");
  })
  .catch((e) => {
    console.log(e);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

const initDB = async () => {
  Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully !!");
};

initDB();
