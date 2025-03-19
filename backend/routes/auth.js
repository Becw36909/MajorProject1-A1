// Auth routes
// dependencies
require("dotenv").config()
const express = require("express")
const Utils = require("../Utils")
const router = express.Router()
const User = require("./../models/User");
const jwt = require('jsonwebtoken')



// POST /auth/signin---------------------------
router.post('/signin', (req, res) => {
    // res.send("Auth > signin route")
    // 1. Validate request (email and password)
    if (!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }

    // 2. Find the user in the database
    User.findOne({email: req.body.email})
    .then(user => {
        // if user doesn't exist
        if(user == null){
            return res.status(400).json({
                message: "Account doesn't exist"
            })
        }
        // continue (user must exist)
        // 3. user exists - verify password
        if(Utils.verifyPassword(req.body.password, user.password)){
            // 4. password check == true, so create user object without password
            const userObject = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                bio: user.bio
                // do I want to include the access level??
                // accessLevel: user.accessLevel
            }
            // 5. generate the access tken
            const accessToken = Utils.generateAccessToken(userObject)
            
            // 6. send back response with accessToken and user object
            res.json({
                accessToken: accessToken,
                user: userObject
            })

        }else {
            // password doesn't match, send back error
            return res.status(400).json({
                message: "Password/Email incorrect"
            })
        }
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({
            message: "problem signing in",
            error: err
        })
    })
})

// GET /auth/validate--------------------------
router.get('/validate', (req, res) => {
    // res.send("Auth > validate route")

    // 1. get token from header
    const token = req.headers['authorization'].split(' ')[1]


    // 2. validate the token using jwt.verify()
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    // 3. if not valid - send back 403 status (forbidden)
    if(err){
        return res.sendStatus(403)
        } else {
    // 4. if valid - send back tokenData (decrypted) as response

    res.json(tokenData)
        }
    })
})

module.exports = router