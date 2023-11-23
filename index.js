/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable quotes */
const app = require("./app") // the actual Express application
const { PORT } = require("./utils/config")
const { info, error } = require("./utils/logger")

app.listen(PORT || 3001, () => {
  console.log(`Server running on port ${PORT}`)
})
