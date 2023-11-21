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
const app = express()

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
