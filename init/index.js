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
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6655b02e119590cdf9d28a42",
    geometry: { type: "Point", coordinates: [77.2088, 28.6139] },
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully !!");
};

initDB();
