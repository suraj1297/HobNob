const User = require("../models/user")
const { validationResult } = require("express-validator")
var jwt = require("jsonwebtoken")

exports.createUser = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    let user = new User(req.body)

    user.encryptPassword = req.body.password

    user.save((err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: "User not created" })
        }

        res.json(user)
    })
}

exports.siginUser = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(400).json({ error: "Sigin unsuccessfull" })

        if (!user) return res.status(400).json({ error: "Email id not found" })
        else if (!user.validatePassword(req.body.password))
            res.status(400).json({ error: "Incorrect Password" })

        var token = jwt.sign({ id: user._id }, user.salt)

        res.json({
            token: token,
            id: user._id
        })
    })
}
