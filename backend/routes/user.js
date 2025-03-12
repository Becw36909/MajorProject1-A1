// User routes
const express = require("express")
const router = express.Router()
const User = require("./../models/User")

// GET - get all users
router.get('/', (req, res) => {

    // get all users from the user model using the find() method
    User.find()
    // or use these to filter
    // User.find({firstName: "Violet"})
    // User.find({accessLevel: 2})


    .then( (users) => {
        console.log(users)
        res.json(users)

    })
    .catch( (users) => { 
        console.log("problem with getting users ", err)
    })

    // res.send("Listing all users from the user route...")
    // const users = [
    //     {
    //         _id: 1, 
    //         firstName: "Jon",
    //         lastName: "Snow",
    //         email: "jsnow@fakemail.com"
    //     }
    // ]

    // res.json(users)
})

module.exports = router