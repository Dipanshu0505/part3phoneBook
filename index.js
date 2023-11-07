const express = require('express')
require('dotenv').config()
const PhoneBook = require('./models/person')
var morgan = require ('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
const cors = require('cors')
app.use(express.static('dist'))

app.use(cors())

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

  app.get('/api/persons', (request, response) => {
    PhoneBook.find({}).then(persons => {
        response.json(persons)
    })
})

  app.get('/info', (request, response) => {
    const currentTime = new Date();
    response.send(`<h1>Phonebook has info for ${persons.length} people </h1> <p>${currentTime}</p>`)
  })

 
  app.get('/api/persons/:id', (request, response) => {
    Note.findById(request.params.id).then(person.json(person))
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
  
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log("printing request" , request.body)
    if (body.name === undefined) {
        console.log(person.content)
        return response.status(400).json({ 
          error: 'bname must be unique' 
        })
      }
    
      person = new PhoneBook ({
        name: body.name,
        number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
  })



const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})