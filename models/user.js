/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */

const mongoose = require("mongoose")

require("dotenv").config()

const userScheme = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
})

userScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model("User", userScheme)

module.exports = User
