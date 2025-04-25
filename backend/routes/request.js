// ServiceRequest routes
const express = require("express");
const router = express.Router();
const ServiceRequest = require("./../models/ServiceRequest");
const authenticateToken = require("./../Utils").authenticateToken;
const Horse = require("./../models/Horse");
const User = require("./../models/User");

// POST - Create new service request
router.post("/", (req, res) => {
  const newRequest = new ServiceRequest(req.body);
  newRequest
    .save()
    .then((request) => res.json(request))
    .catch((err) =>
      res.status(500).json({ message: "problem creating request", error: err })
    );
});

// GET - Get all service requests
router.get("/", (req, res) => {
  ServiceRequest.find()
    .populate("horseID") // show full horse details - optional, is this needed??
    .then((requests) => res.json(requests))
    .catch((err) =>
      res.status(500).json({ message: "problem getting requests", error: err })
    );
});

// export
module.exports = router;
