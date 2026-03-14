require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("connected to mongodb"))
    .catch((err) =>
      console.log("an error occured while connecting to mongodb", err),
    );
};

module.exports = connectDB;
