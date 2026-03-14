const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed)
      res.status(400).json({ message: "This email is already used." });

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({ message: "Sign Up successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Getting all users successfully.",
      data: users,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check the user
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "User not found" });

    // check is matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ message: "Wrong password!" });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "loggin successfly",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
