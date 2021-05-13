const mongoose = require('mongoose')
const env = require('dotenv').config()

mongoose.connect(process.env.DB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Success!'))
