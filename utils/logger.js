const error = (message, error) => {
    console.log(message, error)
}

const info = (message) => {
    console.log(message)
}

module.exports = {
    info, error
}