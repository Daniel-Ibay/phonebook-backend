const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.errorHandler)
app.use(middleware.errorHandler)

module.exports = app

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})
