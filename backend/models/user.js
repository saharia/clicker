const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    score: { type: Number, default: 0 },
    username: { type: String, default: '' },
    prizes: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
