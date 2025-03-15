// User routes
const express = require("express")
const router = express.Router()
const User = require("./../models/User")

// GET - get all users-------------------------------------------------
// endpoint = /user
router.get('/', (req, res) => {
    // get all users from the user model using the find() method
    User.find()
    .then(users => {
        // console.log(users)
        res.json(users)

    })
    .catch( users => { 
        console.log("problem with getting users ", err)
        res.status(500).json({
            message: "problem getting user",
            error: err
    })
})
})


// GET - get a single user by id----------------------------------------
// endpoint = /user/:id
router.get('/:id', (req, res) => {
    // use the User model to find one user by id
    User.findById(req.params.id)
    .then(user => {
        if(!user){
            res.status(404).json({
                message: "user doesn't exist"
            })
        }else{
            res.json(user)
        }

    })
    .catch( err => { 
        console.log("error getting user ", err)
        res.status(500).json({
            message: "problem getting user",
            error: err
        })
    })
})


// POST - create a new user---------------------------------------------
// endpoint = /user
router.post('/', (req, res) => {
    // check if the req.body is empty, if so - send back an error
    if(!req.body){
        return res.status(404).json({
            message: "user content is empty!"
        })
    }

    // create new user using the User model
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        accessLevel: req.body.accessLevel,
        password: req.body.password,
        bio: req.body.bio,
    })

    // save newUser document to the database
    newUser.save()
    .then(user => {
        // send back 201 status and user object
        res.status(201).json(user)
    })
    .catch( err => { 
        console.log("error creating user ", err)
        // send back 500 message with error message
        res.status(500).json({
            message: "problem creating user",
            error: err
        })
    })
})


// PUT - update a user by id--------------------------------------------
// endpoint = /user/:id
router.put('/:id', (req, res) => {
    // check if the req.body is empty, if so - send back an error
    if(!req.body){
        return res.status(404).json({
            message: "user content is empty!"
        })
    }

    //update user with the User model, adding option {new:true} sends back the updated user
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(user => {
        res.json(user)
    })
    .catch(err => { 
        console.log("error updating user ", err)
        // send back 500 message with error message
        res.status(500).json({
            message: "problem updating user",
            error: err
        })
    })

})


// DELETE - delete user by id-------------------------------------------
// endpoint = /user/:id
router.delete('/:id', (req, res) => {
    //validate the request by making sure id isn't missing
    if(!req.params.id){
        return res.status(400).json({
            message: "user id is missing!"
        })
    }

    // delete the user with the User model
    User.findOneAndDelete({_id: req.params.id})
    .then( () => {

        res.json({
            message: "User deleted!"
        })
    })
    .catch(err => {
        console.log("error deleting user", err)
        // send back the 500 status with error message
        res.status(500).json({
            message: "problem deleting user",
            error: err
        })
    })

})



// export
module.exports = router
