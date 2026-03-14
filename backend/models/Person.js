const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: { required: true, type: String },
  date: { required: true, type: Date },
  note: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Person = new mongoose.model("Persons", personSchema);

module.exports = Person;
