/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set("strictQuery", false)

const username = encodeURIComponent(process.env.NAME)
const password = encodeURIComponent(process.env.PASSWORD)

const url = `mongodb+srv://${username}:${password}@atlascluster.1rl6kjx.mongodb.net/?retryWrites=true&w=majority`

console.log("connecting to", url)

mongoose
  .connect(url)

  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Note", noteSchema)
