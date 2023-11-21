// const express = require("express")
// const app = express()

// app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method)
//   console.log("Path:  ", request.path)
//   console.log("Body:  ", request.body)
//   console.log("---")
//   next()
// }

// app.use(requestLogger)

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ]

// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, {
// //     "Content-Type": "application/json",
// //   })
// //   response.end(JSON.stringify(notes))
// // })

// app.get("/", (request, response) => {
//   response.send("<div>Hello world</div>")
// })

// app.get("/api/notes", (request, response) => {
//   response.json(notes)
// })

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find((note) => {
//     return note.id === id
//   })
//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
// })

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
//   return maxId + 1
// }

// app.post("/api/notes", (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     })
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   }

//   notes = notes.concat(note)
//   response.json(note)
// })

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter((note) => note.id !== id)

//   response.status(204).end()
// })

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const date = new Date()
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <br /> <br /> <p>${date}</p>`
  )
})

app.get("/", (req, res) => {
  res.send("<div>Persons Api</div>")
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (req, res) => {
  body = req.body

  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "The name or number is missing",
    })
  }

  if (body.hasOwnProperty(body.name)) {
    return res.status(404).json({
      error: "name must be unique",
    })
  }

  const generateId = Math.random() * 100

  const person = {
    id: generateId,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  res.json(person)
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
