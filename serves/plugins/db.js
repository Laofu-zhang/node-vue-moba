module.exports = app => {
    const mongoose = require('mongoose')
    const dburl = 'mongodb://127.0.0.1:27017/moba'
    mongoose.set('useFindAndModify', false);
    mongoose.connect(dburl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}