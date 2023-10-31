const express = require('express')
var morgan = require ('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
const cors = require('cors')
app.use(express.static('dist'))

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  app.get('/api/persons', (request, response) => {
        response.json(persons)
    })

  app.get('/info', (request, response) => {
    const currentTime = new Date();
    response.send(`<h1>Phonebook has info for ${persons.length} people </h1> <p>${currentTime}</p>`)
  })

 
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })
  
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


  app.post('/api/persons', (request, response) => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id)) 
      : 0
  
    const person = request.body
    person.id = maxId + 1
    
    if (!body.content) {
        return response.status(400).json({ 
          error: 'bname must be unique' 
        })
      }
    
      person = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
      }

    persons = persons.concat(person)
  
    response.json(person)
  })
