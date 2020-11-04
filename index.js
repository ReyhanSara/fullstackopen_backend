if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms,:req'))


app.get('/info',(request,response)=>{
    const dateToday= new Date()
    Person.find({}).then(persons => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people</p>
             <p>${dateToday}</p>`
            )
    })  
})

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request,response,next)=>{
    Person.findById(request.params.id)
    .then(person =>{
        if(person){
            response.json(person.toJSON())
        }else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

// const generateId = () => {
//    const id=Math.floor(Math.random() *200)
//    const freeId = persons.find(p => p.id===id)
//    ? generateId()
//    : id
//    return freeId
//   }

app.post('/api/persons',(request,response)=>{
    const body = request.body

    if (body.name===undefined) {
        return response.status(400).json({ 
          error: 'Name is missing' 
        })
    }else if(body.number===undefined){
        return response.status(400).json({ 
            error: 'Number is missing' 
        })
    }

    const person = new Person({
        name : body.name,
        number : body.number
    }) 

    person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

morgan.token('req', function(req, res) {
    return JSON.stringify(req.body)
});

app.put('/api/persons/:id', (request,response,next) =>{
    const body = request.body

    const person ={
        name: body.name,
        number : body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new : true})
    .then(updatedPerson =>{
        response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})