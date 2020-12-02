const Post = require("../models/post")
const ObjectId = require("mongoose").Types.ObjectId
const formidable = require('formidable')
const fs = require("fs")
const User = require("../models/user")

// creates new post
exports.createPost = (req, res) => {

    let user = req.profile

    let post = new Post({
        image: null,
        caption: null,
        user: user._id,
        created_at: null
    })


    const form = new formidable.IncomingForm({ keepExtensions: true })

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            return res.json({ error: "Error while creating post" })
        }

        post.caption = fields.caption
        post.type = fields.type
        post.created_at = fields.created_at

        // if (!files) return res.json({ error: "Image upload was unsuccessfull" })
        if (files.image) {
            if (files.image.size > 10000000) {
                return res.json({ error: "File size too big!" })
            }
            post.image.data = fs.readFileSync(files.image.path);
            post.image.contentType = files.image.type
        }
        else return res.json({ error: "File not found" })

        post.save((err, post) => {
            if (err) {
                console.log(err)
                return res.json({ error: "Error while creating post" })
            }

            return res.json(post)
        })
    })

}


// return post image
exports.getPostImage = (req, res) => {

    const id = req.params.id

    if (!ObjectId.isValid(id)) return res.json({ error: "Invalid Id" })

    Post.findOne({ _id: id }, (err, post) => {

        if (err || !post) return res.json({ error: "Post Not found" })

        res.set("Content-Type", post.image.contentType);
        return res.send(post.image.data)
    })
}

// return post which are frineds of user
exports.getUserFriendsPosts = (req, res) => {

    const { _id, friends } = req.profile

    Post.find({ $or: [{ type: { $eq: "public" } }, { user: { $in: [...friends, _id] } }] })
        .populate("user", "username dp")
        .select("-image")
        .sort({ created_at: -1 })
        .exec((err, posts) => {
            if (err) return res.json({ error: "Error while retrieving posts" })

            return res.json({ posts: posts })
        })
}

// update post likes 
exports.updateLikes = (req, res) => {

    const userid = req.profile._id
    const postid = req.params.id2

    if (req.params.type === "push")
        Post.updateOne({ _id: postid }, { likes: parseInt(req.params.likes), $push: { liked_by: userid } }, { new: true }, (err, post) => {
            console.log(err)
            if (err) return res.json({ error: "Error while updating post" })

            return res.json({ message: "Successfully updated" })
        })

    else if (req.params.type === "pop")
        Post.findOne({ _id: postid }, (err, post) => {
            console.log(err)
            if (err) return res.json({ error: "Error while updating post" })

            post.likes = req.params.likes

            if (post.liked_by.includes(userid))
                post.liked_by.splice(post.liked_by.indexOf(userid), 1)

            post.save((err, post) => {
                console.log(err)
                if (err) return res.json({ error: "Error while updating post" })

                return res.json({ message: "updated likes successfully" })
            })
        })
}

// gets all posts of user

exports.getAllUserPosts = (req, res) => {
    // .populate("user", "-password -salt -dp -display_picture")

    const userId = req.profile._id
    Post.find({ user: userId })
        .select("-image -caption -type -likes -liked_by")
        .populate("user", "username friends dp")
        .sort({ created_at: -1 })
        .exec((err, posts) => {
            if (err || !posts) return res.json({ error: "Error while retrieving posts" })
            if (posts.length > 0) return res.json({ posts: posts })

            let user = req.profile
            user.display_picture = undefined
            user.salt = undefined
            user.password = undefined
            user.friend_requests = undefined
            return res.json(user)
        })

}

// delete post
exports.deletePost = (req, res) => {

    const id = req.params.id

    if (!ObjectId.isValid(id)) return res.json({ error: "Invalid Id" })

    Post.deleteOne({ _id: id }, (err, response) => {
        if (err) return res.json({ error: "Error while deleting post" })

        return res.json({ message: "Post was deleted successfully" })
    })
}