const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("./connection/connection")

const authRoutes = require("./routes/auth")

const app = express()

// middlewares
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))

// routes
app.use("/api/", authRoutes)

// Server
app.listen(8000, () => console.log("App listening @ http://localhost:8000/"))
