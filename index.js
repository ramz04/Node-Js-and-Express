/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const express = require("express")
const app = express()
const cors = require("cors")
const Note = require("./models/note")

app.use(express.json())
app.use(cors())
require("dotenv").config()

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(requestLogger)

// const app = http.createServer((request, response) => {
//   response.writeHead(200, {
//     "Content-Type": "application/json",
//   })
//   response.end(JSON.stringify(notes))
// })

app.get("/", (request, response) => {
  response.send("Hello world")
})

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post("/api/notes", (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
  }

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => next(err))
})

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body

  // const note = {
  //   content: body.content,
  //   important: body.important,
  // }

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => response.json(updatedNote))
    .catch((err) => next(err))
})

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
