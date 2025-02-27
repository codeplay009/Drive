const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    FilePath:{
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;