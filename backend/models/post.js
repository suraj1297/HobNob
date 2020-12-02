const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    caption: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    created_at: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['public', 'friends'],
        default: "public"
    },
    likes: {
        type: Number,
        default: 0
    },
    liked_by: {
        type: [],
        default: []
    }
})


module.exports = mongoose.model("Post", postSchema)