const { isAuthenticate } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const router = require("express").Router()

const { createPost, getPostImage, getUserFriendsPosts, updateLikes, getAllUserPosts, deletePost } = require("../controllers/post")

// created new post
router.post("/post/createPost/:id", isAuthenticate, getUserById, createPost)

// gets post image
router.get("/post/image/:id", getPostImage)

// retieves all the post/stories of friends/public posts of user
router.get("/post/user/:id", isAuthenticate, getUserById, getUserFriendsPosts)

//  update post likes
//  id is user id, id2 postId
// type : ["push", "pop"]
router.put('/post/likes/:id/:id2/:likes/:type', isAuthenticate, getUserById, updateLikes)

// gets all posts of user
router.get('/posts/:id', isAuthenticate, getUserById, getAllUserPosts)

// delete post
// id = postId
router.delete('/post/delete/:id', isAuthenticate, deletePost)

module.exports = router