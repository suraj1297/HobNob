const User = require("../models/user")
const ObjectId = require("mongoose").Types.ObjectId
const formidable = require('formidable')
const fs = require("fs")
const { response } = require("express")

// will use the user id infused by expree-jwt and will fetch the user from db
exports.getUserById = (req, res, next) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) return res.json({ error: "Invalid object id" })

    User.findOne({ _id: id }, (err, user) => {
        if (err || !user) return res.json({ error: "User not found" })
        req.profile = user
        next()
    })
}


// will send the user as json response
exports.getUser = (req, res) => {

    if (req.profile) {
        req.profile.display_picture = undefined
        req.profile.friends = undefined
        req.profile.salt = undefined
        req.profile.password = undefined
        req.profile.friend_requests = undefined

        return res.json(req.profile)
    }

    return res.json({ error: "User not found!" })
}

// update user
exports.updateUser = (req, res) => {

    let user = req.body

    for (let key in user) {
        req.profile[key] = user[key]
    }

    user = req.profile

    user.save((err, user) => {
        if (err) return res.json({ error: "User updation was unsuccessfull" })

        user.friends = undefined
        user.display_picture = undefined
        user.salt = undefined
        user.password = undefined
        user.friend_requests = undefined

        return res.json(user)
    })
}

// updates display picture of user
exports.updateDisplayPicture = (req, res) => {

    let user = req.profile

    const form = new formidable.IncomingForm({ keepExtensions: true })

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        // if (!files) return res.json({ error: "Image upload was unsuccessfull" })
        if (files.display_picture) {
            if (files.display_picture.size > 10000000) {
                return res.json({
                    error: "File size too big!"
                });
            }
            user.display_picture.data = fs.readFileSync(files.display_picture.path);
            user.display_picture.contentType = files.display_picture.type
            user.dp = true
        }
        else return res.json({ error: "File not found" })

        user.save((err, user) => {
            if (err) return res.json({ error: "Image upload was unsuccessfull" })

            user.friends = undefined
            user.display_picture = undefined
            user.salt = undefined
            user.password = undefined
            user.friend_requests = undefined
            return res.json(user)
        })
    });
}




// will send the diplay_picture of user as json
exports.getDisplayPicture = (req, res) => {
    if (req.profile && req.profile.display_picture.data) {
        res.set("Content-Type", req.profile.display_picture.contentType);
        return res.send(req.profile.display_picture.data);
    }
    return res.json({ error: "Image not set by user" })
};


// will search people from matched query parameter
exports.searchPeople = (req, res) => {
    const name = req.query.name

    User.find({
        $or: [
            { firstname: { $regex: new RegExp(name, "i") } },
            { lastname: { $regex: new RegExp(name, "i") } },
            { username: { $regex: new RegExp(name, "i") } }
        ]
    }
    )
        .select('firstname lastname username dp friends friend_requests')
        .exec((err, people) => {

            if (err || !people) return res.json({ error: "No match found" })

            return res.json({ people: people })
        })
}


// update friend request array

exports.updateFriendRequest = (req, res) => {
    const id = req.params.idto

    User.updateOne({ _id: id }, { $push: { friend_requests: req.profile._id } }, { new: true })
        .exec((err, user) => {
            if (err || !user) return res.json({ error: 'Request was unsuccessfull' })

            user.friends = undefined
            user.display_picture = undefined
            user.salt = undefined
            user.password = undefined
            user.friend_requests = undefined

            res.send(user)
        })
}

exports.deletefriendRequest = async (req, res) => {
    const id = req.params.idto

    User.findOne({ _id: id }, (err, user) => {
        if (err || !user) return res.json({ error: "Deletion was unsuccessful" })

        if (user.friend_requests.length > 0) {
            if (user.friend_requests.includes(req.profile._id))
                user.friend_requests.splice(user.friend_requests.indexOf(req.profile._id), 1)
        }

        user.save((err, user) => {
            if (err || !user) return res.json({ error: "Deletion was unsuccessful" })
            return res.json({ user: user.friend_requests })
        })
    })
}

// will send user friends array as json
exports.getUserFriends = (req, res) => {
    if (req.profile) {
        return res.json({ friends: req.profile.friends })
    }

    return res.json({ error: "User not found!" })
}

exports.getUserFriendRequests = (req, res) => {
    if (req.profile)
        return res.json({ requests: req.profile.friend_requests })
    else return res.json({ error: "User not found!" })
}

// accepts friend requests
exports.acceptRequest = async (req, res) => {
    const id1 = req.params.id1
    const id2 = req.params.id2

    User.findOne({ _id: id1 }, (err, user) => {
        if (err || !user) return res.json({ error: "User 1 was not found" })

        // if request was deleted and other user didnt refresh page and tries to accept then it will be not accepted
        if (!user.friend_requests.includes(id2)) return res.json({ error: "Oops! seems like friend request was deleted from other side" })

        user.friends.push(id2)
        user.friend_requests.splice(user.friend_requests.indexOf(id2), 1)

        user.save((err, response) => {
            if (err) return res.json({ error: "Error while accepting friend request" })

            User.findOne({ _id: id2 }, (err, user) => {
                user.friends.push(id1)

                user.save((err, response) => {
                    if (err) return res.json({ error: "Error while accepting friend request" })
                    return res.json({ message: "Request accepted" })
                })
            })

        })

    })
}