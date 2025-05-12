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
    .populate("horseID") // also show full horse details
    .then((requests) => res.json(requests))
    .catch((err) =>
      res.status(500).json({ message: "problem getting requests", error: err })
    );
});

// GET - get all requests for a horse
router.get('/horse/:horseId', (req, res) => {
  ServiceRequest.find({ horseID: req.params.horseId })
    .then(results => res.json(results))
    .catch(err => res.status(500).json({ message: 'Error fetching services', error: err }));
});

// DELETE - Delete all requests for a specific horse
// router.delete('/horse/:horseId', (req, res) => {
//   ServiceRequest.deleteMany({ horseID: req.params.horseId })
//     .then(() => res.json({ message: 'All service requests deleted for this horse' }))
//     .catch(err => res.status(500).json({ message: 'Error deleting service requests', error: err }));
// });

// DELETE - Delete all requests for a specific horse
router.delete('/horse/:horseId', (req, res) => {
  ServiceRequest.deleteMany({ horseID: req.params.horseId })
    .then(result => {
      res.json({
        message: result.deletedCount === 0
          ? 'No service requests found for this horse.'
          : `Deleted ${result.deletedCount} service request(s)`
      });
    })
    .catch(err => res.status(500).json({ message: 'Error deleting service requests', error: err }));
});




// export
module.exports = router;
