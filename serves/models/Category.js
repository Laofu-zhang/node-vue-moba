const mongoose = require('mongoose')

// 分类模型
const schema = new mongoose.Schema({
    "title": {type: String},
    "parent": {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)

