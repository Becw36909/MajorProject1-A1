// dependencies
const mongoose = require("mongoose");

// schema------------------------------------
const horseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: String,
  age: String,
  height: String,
  sex: String,
  microchipNumber: String,
  colour: String,
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensure each horse belongs to a user
  },
  notes: String,
  image: String, // store filename
});

// export
module.exports = mongoose.model("Horse", horseSchema);
