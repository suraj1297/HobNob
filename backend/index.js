const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("./connection/connection")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const app = express()

// middlewares
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))

// routes
app.use("/api/", authRoutes)
app.use("/api/", userRoutes)

// JWT Error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(200).json({ error: "Invalid Token" })
    }
});

// Server
app.listen(8000, () => console.log("App listening @ http://localhost:8000/"))
