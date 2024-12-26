const config = require('./utils/config.js')
const mongoose = require('mongoose')
const Person = require('./models/person')
const logger = require('./utils/logger.js')


if (process.argv.length < 3) {
    logger.info('give password as argument')
    process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(() => {
    logger.info('connected to MongoDB')
  })
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

if (process.argv[4]) {

    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        logger.info('person added!')
        mongoose.connection.close()
    })
} else {
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            logger.info(person)
        })
        mongoose.connection.close()
    })
}