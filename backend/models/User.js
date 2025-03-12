// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email')


// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    accessLevel: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
}
// do I want the timestamps option??
// ,
// {timestamps: true}
)

// create Mongoose model
const userModel = mongoose.model('User', userSchema)

// export
module.exports = userModel