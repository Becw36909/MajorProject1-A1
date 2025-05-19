// Horse routes
const express = require("express");
const router = express.Router();
const Horse = require("../models/Horse");
const Utils = require("../Utils");
const User = require("./../models/User");
const path = require("path");

// POST - Add new horse
router.post("/", (req, res) => {
  if (!req.body && !req.files) {
    return res.status(400).json({ message: "No data provided." });
  }

  const requiredFields = ["name", "ownerID"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required.` });
    }
  }

  let horseData = req.body;

  // If there's an image file, upload it
  if (req.files && req.files.image) {
    Utils.uploadFile(
      req.files.image,
      path.join(__dirname, "../public/images"),
      (filename) => {
        horseData.image = filename;

        const newHorse = new Horse(horseData);
        newHorse
          .save()
          .then((horse) => res.status(201).json(horse))
          .catch((err) => {
            console.log("error adding horse", err);
            res
              .status(500)
              .json({ message: "problem adding horse", error: err });
          });
      }
    );
  } else {
    // no image to upload
    const newHorse = new Horse(horseData);
    newHorse
      .save()
      .then((horse) => res.status(201).json(horse))
      .catch((err) => {
        console.log("error adding horse", err);
        res.status(500).json({ message: "problem adding horse", error: err });
      });
  }
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
