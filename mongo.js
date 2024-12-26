require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://daniel-ibay:melvin1538@phonebook-test.dx0j7.mongodb.net/?retryWrites=true&w=majority&appName=phonebook-test`

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

if (process.argv[4]) {

    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        console.log('person added!')
        mongoose.connection.close()
    })
} else {
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}