const User = require("../models/user")
require("dotenv").config()
const {
    validationResult
} = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.createUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(200).json({
            error: errors.errors[0].msg
        })

    let response = await User.findOne({ username: req.body.username })


    if (response) return res.json({ error: "Username not available!" })

    response = User.findOne({ email: req.body.email })
    if (response) return res.json({ error: "User is already registered using given email id!" })

    let user = new User(req.body)

    user.encryptPassword = req.body.password

    user.save((err, user) => {
        if (err) {
            return res.status(200).json({
                error: "User not created"
            })
        }

        res.json(user)
    })
}

exports.siginUser = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(200).json({
            error: errors.array()[0].msg
        })

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) return res.status(200).json({
            error: "Sigin unsuccessfull"
        })

        if (!user) return res.status(200).json({
            error: "User not found! Please check Email Id"
        })

        if (!user.validatePassword(req.body.password))
            return res.status(200).json({
                error: "Incorrect Password"
            })

        var token = jwt.sign({
            id: user._id
        }, process.env.JWT_SALT_KEY)

        res.json({
            token: token,
            id: user._id,
            name: user.firstname,
            dp: user.dp
        })
    })
}


exports.isAuthenticate = expressJwt({
    secret: process.env.JWT_SALT_KEY,
    requestProperty: 'auth',
    algorithms: ['HS256']
})