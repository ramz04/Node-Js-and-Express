/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
require("dotenv").config()

const username = encodeURIComponent(process.env.NAME)
const password = encodeURIComponent(process.env.PASSWORD)

const PORT = process.env.PORT
const MONGODB_URI = `mongodb+srv://${username}:${password}@atlascluster.1rl6kjx.mongodb.net/?retryWrites=true&w=majority`

module.exports = {
  MONGODB_URI,
  PORT,
}
