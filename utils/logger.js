/* eslint-disable linebreak-style */
/* eslint-disable indent */
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}
