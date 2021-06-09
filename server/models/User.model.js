const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, default: ''},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: null},
    last_seen: String
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)