// User routes
const express = require("express")
const router = express.Router()

// GET - get all users
router.get('/', (req, res) => {
    // res.send("Listing all users from the user route...")
    const users = [
        {
            _id: 1, 
            firstName: "Jon",
            lastName: "Snow",
            email: "jsnow@fakemail.com"
        }
    ]

    res.json(users)
})

module.exports = router