// Horse routes
const express = require("express");
const router = express.Router();
const Horse = require("../models/Horse");
const { authenticateToken } = require("../Utils");

// POST - Add new horse
router.post("/", (req, res) => {
  const { name, ownerID } = req.body;

  if (!name || !ownerID) {
    return res.status(400).json({ message: "Name and ownerID are required" });
  }
  const newHorse = new Horse(req.body);
  newHorse
    .save()
    .then((horse) => res.json(horse))
    .catch((err) =>
      res.status(500).json({ message: "problem adding horse", error: err })
    );
});

// GET - Get all horses
router.get("/", (req, res) => {
  Horse.find()
    .then((horses) => res.json(horses))
    .catch((err) =>
      res.status(500).json({ message: "problem getting horses", error: err })
    );
});

// GET - Get horse by ID
router.get("/:id", (req, res) => {
  Horse.findById(req.params.id)
    .then((horse) => res.json(horse))
    .catch((err) =>
      res.status(500).json({ message: "problem getting horse", error: err })
    );
});

// DELETE - Delete horse by ID
router.delete("/:id", (req, res) => {
  Horse.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "horse deleted" }))
    .catch((err) =>
      res.status(500).json({ message: "problem deleting horse", error: err })
    );
});

// export
module.exports = router;
