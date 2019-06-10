const Schema = require('mongoose').Schema

const users = Schema({
    id: String
}, {
        timestamps: true
    })

const message = Schema({
    uid: String,
    date: Date,
    baht: Number,
    text: String
}, {
        timestamps: true
    })

module.exports = {
    users: db.model('users', users),
    message: db.model('message', message)
}