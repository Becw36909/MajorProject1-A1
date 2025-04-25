const mongoose = require("mongoose");

// schema------------------------------------
const serviceRequestSchema = new mongoose.Schema({
  horseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Horse",
    required: true, // Ensure each ServiceRequest belongs to a horse
  },
  serviceType: { type: String, required: true },
  notes: String,
  
  date: { type: Date, default: Date.now },
});

// export
module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
