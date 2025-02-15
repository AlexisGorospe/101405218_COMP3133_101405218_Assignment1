const mongoose = require('mongoose');
const emailRegex  = require('../constants');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter username']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: [true, 'Email has already been used!'],
        validate: function(value) {
            return emailRegex.test(value);
        }
    },
    password:{
        type: String,
        required: [true, 'Please enter password'],
        //encrypt: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;