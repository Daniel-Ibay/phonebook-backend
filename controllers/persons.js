const personsRouter = require('express').Router()
const Person = require('./models/note')

app.get('/', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error));
})

app.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.post('/', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
            name: body.name,
            number: body.number,
        })

    person
    .save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error));
})

app.delete(':id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/:id', (request, response, next) => {
    const { name, number } = request.body
    
    Person.findByIdAndUpdate(request.params.id,
        { name, number},
        { new: true , runValidators: true, context: 'query' })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

module.exports = personsRouter