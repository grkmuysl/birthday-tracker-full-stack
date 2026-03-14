const Person = require("../models/Person");

exports.getPersons = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

    const persons = await Person.find({ owner: ownerId });

    res.status(200).json({
      message: "Getting all persons",
      data: persons,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addPerson = async (req, res, next) => {
  try {
    const newPerson = new Person(req.body);
    newPerson.owner = req.user.id;

    await newPerson.save();
    res.status(200).json({
      message: "Adding new person",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePerson = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const personId = req.params.id;

    const person = await Person.findById(personId);
    if (!person) {
      res.status(400).json({ message: "There is no person with this ID." });
      return;
    }

    if (ownerId != person.owner) {
      res.status(403).json({ message: "Wrong owner" });
      return;
    }

    await Person.findByIdAndDelete(personId);

    res.status(200).json({ message: "Deleting successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePerson = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const userId = req.params.id;

    const person = await Person.findById(userId);

    if (!person) {
      res.status(400).json({ message: "There is no person with this ID." });
      return;
    }

    if (ownerId != person.owner) {
      res.status(403).json({ message: "Wrong owner" });
      return;
    }

    await Person.findByIdAndUpdate(userId, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
