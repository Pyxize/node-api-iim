const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

    title: {type: String, required:true},
    description:{type: String, required:true},
    author:{type: String, required:true},
    publishedDate:{type: Date, required:false}
})

module.exports = mongoose.model('Book', bookSchema)