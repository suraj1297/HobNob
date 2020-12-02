const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("./connection/connection")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")

const app = express()

// middlewares
app.use(bodyParser.json())
app.use(cors())

// routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", postRoutes)


// JWT Error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(200).json({ error: "Invalid Token" })
    }
})

// Server
app.listen(8000, () => console.log("App listening @ http://localhost:8000/"))
