// dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const Utils = require("./../Utils");

// schema------------------------------------
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true,
    },
    accessLevel: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    newUser: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// hash password (middleware)-------------------------
userSchema.pre("save", function (next) {
  // check if password is present and is modified
  if (this.password && this.isModified()) {
    // replace original password with new hashed password
    this.password = Utils.hashPassword(this.password);
  }
  // continue
  next();
});

// create Mongoose model--------------------------------
const userModel = mongoose.model("User", userSchema);

// export
module.exports = userModel;
