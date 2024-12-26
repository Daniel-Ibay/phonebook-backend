require('dotenv').config

const PORT = procces.env.PORT
const MONGODB_URI = procces.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}