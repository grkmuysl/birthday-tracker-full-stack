const express = require("express");
const router = express.Router();
const personController = require("../controller/personController");
const { authenticateMiddleware } = require("../middlewares/authMiddleware");

router.get("/get-persons", authenticateMiddleware, personController.getPersons);
router.get(
  "/upcoming-birthdays",
  authenticateMiddleware,
  personController.getUpcomingPersons,
);
router.post("/add-person", authenticateMiddleware, personController.addPerson);
router.delete(
  "/delete-person/:id",
  authenticateMiddleware,
  personController.deletePerson,
);
router.put(
  "/update-person/:id",
  authenticateMiddleware,
  personController.updatePerson,
);

module.exports = router;
