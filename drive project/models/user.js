const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [13, 'Email must be at least 13 characters long']
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be at least 5 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;