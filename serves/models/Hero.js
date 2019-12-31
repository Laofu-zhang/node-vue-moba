const mongoose = require('mongoose')

// 分类模型
const schema = new mongoose.Schema({
    "title": {type: String},
    "avatar": {type: String},
    "designation": {type: String},
    "categories": [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    "scores": {
        "skills": {type: Number},
        "difficult": {type: Number},
        "attack": {type: Number},
        "survive": {type: Number}
    },
    "skills": [
        {
            "icon": {type: String},
            "name": {type: String}, 
            "discription": {type: String}, 
            "tips": {type: String}
        }
    ],
    "items1": [{type: mongoose.SchemaTypes.ObjectId, ref: 'Items'}],
    "items2": [{type: mongoose.SchemaTypes.ObjectId, ref: 'Items'}],
    "usageTips": {type: String},
    "battleTips": {type: String},
    "teamTips": {type: String},
    "partnes": [
        {
            "hero": {type: mongoose.SchemaTypes.ObjectId, ref: "Hero"},
            "discription": {type: String} 
        },
    ],

    // "parent": {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Hero', schema)

