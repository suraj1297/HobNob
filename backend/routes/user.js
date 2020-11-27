const router = require("express").Router()
const { isAuthenticate } = require("../controllers/auth")
const {
    getUserById,
    getUser,
    updateUser,
    updateDisplayPicture,
    getDisplayPicture,
    searchPeople,
    updateFriendRequest,
    deletefriendRequest,
    getUserFriends,
    getUserFriendRequests,
    acceptRequest
} = require("../controllers/user")

const User = require("../models/user")

router.route("/user/:id")
    .get(isAuthenticate, getUserById, getUser)
    .put(isAuthenticate, getUserById, updateUser)


// updates user display_picture and returns
router
    .get("/user/display_picture/:id", getUserById, getDisplayPicture)
    .put("/user/display_picture/:id", isAuthenticate, getUserById, updateDisplayPicture)

//  returns people searched by user
router.get("/people?", isAuthenticate, searchPeople)


// updaates and deletes friend requests
router.route("/user/friendrequest/:id/:idto")
    .put(getUserById, updateFriendRequest)
    .delete(getUserById, deletefriendRequest)

// returns friend requests
router.get('/user/friendrequests/:id', isAuthenticate, getUserById, getUserFriendRequests)

// returns friends array
router.get("/user/friends/:id", isAuthenticate, getUserById, getUserFriends)

// accepts friends requests
// id1 must be of the user to whom request is sent and second id must be of user who sent request
router.put("/user/acceptrequest/:id1/:id2", isAuthenticate, acceptRequest)



module.exports = router




// router.put("/update", (req, res) => {
//     User.updateMany({}, { $set: { friend_requests: [] } })
//         .exec((err, response) => {
//             if (err) res.send(err)
//             res.send(response)
//         })
// })