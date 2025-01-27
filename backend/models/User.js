const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    email: String,
    address: String,
    phone: String,
    password: String
})

module.exports = User