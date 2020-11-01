const { response } = require('express')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms,:req'))

let persons = [
    {
        id: 1,
        name : "Arto Hellas",
        number : "040-1234"
    },
    {
        id: 2,
        name : "Ada Lovela0e",
        number : "12-34-45"
    },
    {
        id: 3,
        name : "Dava Hien",
        number : "42-34-55"
    }
]
app.get('/',(request,response)=>{
    response.send('<h1>Hello</h1>')
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id= Number(request.params.id)
    const getPerson= persons.find(p => p.id === id)

    if(getPerson){
        response.json(getPerson)
    }else{
        response.status(404).end()
    }
})

app.get('/info',(request,response)=>{
    const personCount= persons.length
    const dateToday= new Date()
    response.send(
    `<p>Phonebook has info for ${personCount} people</p>
     <p>${dateToday}</p>`
    )
})

const generateId = () => {
   const id=Math.floor(Math.random() *200)
   const freeId = persons.find(p => p.id===id)
   ? generateId()
   : id
   return freeId
  }

app.post('/api/persons',(request,response)=>{
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
          error: 'Name is missing' 
        })
    }else if(!body.number){
        return response.status(400).json({ 
            error: 'Number is missing' 
        })
    }else if(persons.find(p=> p.name === body.name)){
        return response.status(409).json({ 
            error: 'Name must be unique' 
        })
    }
        const person = {
            id : generateId(),
            name : body.name,
            number : body.number
        }

       persons= persons.concat(person)
       response.json(person)
})

morgan.token('req', function(req, res) {
    return JSON.stringify(req.body)
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})