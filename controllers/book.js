const Book = require('../models/book')
const fs = require('fs')
exports.createBook = (req,res)=>{
    const bookObject = req.body
    delete bookObject._id;
    const s = new Book({
        ...bookObject
    })
    s.save()
        .then(() => res.status(201).json({message : 'ok'}))
        .catch(error => res.status(400).json({ error}))
}

exports.updateBookId =(req,res,next)=>{
    Book.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}

exports.deleteBookId =(req,res,next)=>{
    console.log('delete test id')
    Book.findOne({_id:req.param.id})
        .then( book => {
                Book.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message: 'ok'}))
                    .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))  
}

exports.getBookId = (req,res,next)=>{
    console.log('get test id')
    Book.findOne({_id:req.params.id})
        .then(book=> res.status(200).json(book))
        .catch(error => res.status(404).json({error}))
}

exports.getAllBook = (req,res,next)=> {
    console.log('get all test')
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error=> res.status(400).json({error}));
}