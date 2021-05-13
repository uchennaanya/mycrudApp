const express = require('express')
const env = require('dotenv').config()

const connect = require('./db/db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const User = require('./models/model')

app.get('/', (req, res) => {
    res.send({ "msg": "Welcome message!" })
});

app.post('/create', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {

            if (user == null) {

                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    country: req.body.country
                }).then(user => {
                    res.send({
                        "msg": "Created",
                        "res": user
                    })
                })
            }

        }).catch(err => {
            res.send({
                "msg": "Failed",
                "res": err.message
            })
        })
    User.create()
});

app.get('/guetusers', (req, res) => {
    User.find({})
        .then((users) => {
            res.send({
                "msg": "Success",
                "users": users
            })
        }).catch(err => {
            res.send({
                "msg": "Failed!",
                "error": err.message
            })
        })
});

app.get('/guetusers/:id', (req, res) => {
    User.findOne({ "_id": req.params.id })
        .then(user => {
            res.send({
                "msg": "Success",
                "response": user
            })
        }).catch(err => {
            res.send({
                "msg": "Failed!",
                "res": err.message
            })
        })
});

app.put('/updateuser/:id', (req, res) => {
    User.findByIdAndUpdate({ "_id": req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    })
        .then(user => {
            res.send({
                "msg": "Updated!",
                "response": user
            })
        }).catch(err => {
            res.send({
                "msg": "Failed",
                "Error": err.message
            })
        })
});

app.delete('/deleteuser/:id', (req, res) => {
    User.findByIdAndRemove({ '_id': req.params.id })
        .then(user => {
            res.send({
                "msg": "Deleted!",
                "response": user
            })
        }).catch(err => {
            res.send({
                "msg": "Not deleted!",
                "error": err.message
            })
        })
})

PORT = process.env.PORT

app.listen(PORT, () => console.log('Server extablished'))
