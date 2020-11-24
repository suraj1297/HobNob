const mongoose = require("mongoose")
const { v4: uuidv4, __esModule } = require("uuid")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
})

// virtual will set the salt value which will be unique for each user whih will be used to encrpt password
userSchema
    .virtual("encryptPassword")
    .get(function () {
        return this.password
    })
    .set(function (password) {
        this.salt = uuidv4()
        this.password = this.crpytoPassword(password)
    })

// function for hashing/encrping password
userSchema.methods.crpytoPassword = function (password) {
    return crypto.createHmac("sha256", this.salt).update(password).digest("hex")
}

userSchema.methods.validatePassword = function (password) {
    return this.password === this.crpytoPassword(password)
}

module.exports = mongoose.model("User", userSchema)
