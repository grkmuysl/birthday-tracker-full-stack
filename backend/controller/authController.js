const User = require("../models/User");

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
