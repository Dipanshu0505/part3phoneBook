const express = require('express')
require('dotenv').config()
const PhoneBook = require('./models/person')
var morgan = require ('morgan')
const app = express()
app.use(morgan('tiny'))
const cors = require('cors')
app.use(express.static('dist'))
app.use(express.json())
// app.use(requestLogger)

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

 
  app.get('/api/persons/:id', (request, response, next) => {
    PhoneBook.findById(request.params.id)
    .then(persons => {
    if (persons) {
        response.json(persons)
    } else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})

//   app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
//     response.status(204).end()
//   })

app.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findOneAndDelete({_id: request.params.id})
    .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  
  app.post('/api/persons', (request, response, next) => {
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
        .catch(error => next(error))
  })


  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
        name: body.name,
        number: body.number,
    }
  
    PhoneBook.findOneAndUpdate(request.params.id, person,{ content, important }, { new: true, runValidators: true, context: 'query' })
      .then(updatedPersons => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  } 
app.use(errorHandler)


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})