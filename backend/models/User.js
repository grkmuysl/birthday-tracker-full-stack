const mongoose = require("mongoose");
const brcypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: { required: true, type: String },
  surname: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = brcypt.genSalt(9);
    this.password = await brcypt.hash(this.password, salt);
  } catch (error) {
    console.log("error occured in password hashing", error);
    throw error;
  }
});

const User = new mongoose.model("Users", userSchema);

module.exports = User;
