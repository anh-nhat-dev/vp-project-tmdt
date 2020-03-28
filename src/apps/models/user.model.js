const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_full: String,
    user_mail: String,
    user_pass: String,
    user_level: Number
});

module.exports = mongoose.model('User', UserSchema, 'User')