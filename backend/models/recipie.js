const mongoose = require('mongoose');

const recipieSchema = new mongoose.Schema({
    rname: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    recipe: {
        type: String,
        require: true
    },
    imgurl: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipie', recipieSchema);