const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    email: {
        type: String,
        isEmail: true
    },
    address: String,
    phone: String,
    password: String
})

module.exports = User