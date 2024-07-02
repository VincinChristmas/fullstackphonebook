const express = require('express')
const app = express()


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },

    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },

    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      },
      {
        "id": "5",
        "name": "Mukasashi Yamamoto",
        "number": "38-76-55678990"
      }
]

app.use(express.json())



app.get('/', (request, response)=>{
    response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`<h1>Phonebook has info for ${persons.length} people<h1/><h1>${currentDate}</h1>`)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  persons = notes.concat(person)

  response.json(person)
})


app.get('/api/persons', (request, response)=>{
    response.json(persons)
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)