
const mongoose = require('mongoose')

// 分类模型
const schema = new mongoose.Schema({
    "title": {type: String},
    "categories": [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    "body": {type: String}
})

module.exports = mongoose.model('Article', schema)

