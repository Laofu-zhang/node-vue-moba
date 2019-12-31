const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    "title": {type: String},
    "items": [
        {
            "image": {type: String},
            "url": {type: String}
        }
    ]
})

module.exports = mongoose.model('Ads', schema)