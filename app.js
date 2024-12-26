const app = require('./index.js')
const config = require('./utils/config.js')

const PORT = config.PORT

app.listen(PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})