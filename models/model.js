const mongoose = require('mongoose')

const CrudSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    }
})

const User = mongoose.model('userTable', CrudSchema)

module.exports = User