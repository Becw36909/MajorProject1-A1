// User routes
const express = require("express");
const router = express.Router();
const Utils = require("../Utils");
const User = require("./../models/User");
const path = require("path");
const { authenticateToken } = require("../Utils");

// GET - get all users (auth required) -------------------------------------------------
// endpoint = /user
router.get("/", authenticateToken, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.log("error finding users", err);
      res.status(500).json({ message: "problem finding users", error: err });
    });
});

// GET - get a single user by id (auth required)----------------------------------------
// endpoint = /user/:id
router.get("/:id", authenticateToken, (req, res) => {
  // use the User model to find one user by id
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "user doesn't exist",
        });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      console.log("error getting user ", err);
      res.status(500).json({
        message: "problem getting user",
        error: err,
      });
    });
});

// POST - create a new user---------------------------------------------
// endpoint = /user
router.post("/", (req, res) => {
  // check if the req.body is empty, if so - send back an error
  if (!req.body) {
    return res.status(404).json({
      message: "user content is empty!",
    });
  }

  // check if email is already in use
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user != null) {
        return res.status(400).json({
          message: "email already in use",
        });
      }

      // create new user using the User model
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        accessLevel: req.body.accessLevel,
        password: req.body.password,
        bio: req.body.bio,
        profileImage: req.body.profileImage,
      });

      // save newUser document to the database
      newUser
        .save()
        .then((user) => {
          // send back 201 status and user object
          res.status(201).json(user);
        })
        .catch((err) => {
          console.log("error creating user ", err);
          // send back 500 message with error message
          res.status(500).json({
            message: "problem creating user",
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "problem creating account",
      });
    });
});

// PUT - update a user by id--------------------------------------------
// endpoint = /user/:id
router.put("/:id", authenticateToken, (req, res) => {
  if (!req.body && !req.files) {
    return res.status(400).json({ message: "No data provided." });
  }

  let updateData = req.body;

  if (req.files && req.files.profileImage) {
    Utils.uploadFile(
      req.files.profileImage,
      path.join(__dirname, "../public/images"),
      (filename) => {
        updateData.profileImage = filename;

        User.findByIdAndUpdate(req.params.id, updateData, { new: true })
          .then((user) => res.json(user))
          .catch((err) => {
            console.log("error updating user", err);
            res
              .status(500)
              .json({ message: "problem updating user", error: err });
          });
      }
    );
  } else {
    // Ensure optional profileImage does not overwrite existing one with undefined
    if (!updateData.profileImage) delete updateData.profileImage;

    User.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log("error updating user", err);
        res.status(500).json({ message: "problem updating user", error: err });
      });
  }
});

// DELETE - delete user by id (auth required)-------------------------------------------
// endpoint = /user/:id
router.delete("/:id", authenticateToken, (req, res) => {
  // delete the user with the User model
  User.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.json({
        message: "User deleted!",
      });
    })
    .catch((err) => {
      console.log("error deleting user", err);
      // send back the 500 status with error message
      res.status(500).json({
        message: "problem deleting user",
        error: err,
      });
    });
});

// export
module.exports = router;
