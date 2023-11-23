/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */

const express = require("express")
const app = express()
const cors = require("cors")
const { MONGODB_URI } = require("../utils/config")
const mongoose = require("mongoose")
const notesRouter = require("./controllers/notes")
const {
  requestLogger,
  errorHandler,
  unknownEndpoint,
} = require("./utils/middleware")
const usersRouter = require("./controllers/users")

mongoose.set("strictQuery", false)

const url = MONGODB_URI

console.log("connecting to", url)

mongoose
  .connect(url)

  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)

app.use(unknownEndpoint)

// this has to be the last loaded middleware
app.use(errorHandler)

module.exports = app
