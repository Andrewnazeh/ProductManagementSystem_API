
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
    }, password: {
        type: String,
        required: [true, "Please provide a password"],
    }, role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
});

module.exports = mongoose.model('Users', UserSchema);
