const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    code: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('File', FileSchema);