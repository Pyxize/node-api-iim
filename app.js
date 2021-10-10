const express = require('express')
const app = express()
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Post = require('./models/post')
const Book = require('./models/book')
const port = 4000
const testRoutes = require('./routes/test')
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
const path = require('path')
const server = app.listen(5000)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080"
    }
});




mongoose.connect('mongodb+srv://maxime:jesaispas@cluster0.jz8qj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=> console.log("db valid"))
.catch(()=> console.log("db error"))
/*
app.use('/',(req, res,next) =>{
    res.json({message: "oklm"})
})*/
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`);
    
    socket.on('message', data => {
        socket.broadcast.emit('message:received', data)
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left.`)
    })
})

app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/test',testRoutes)
app.use('/book',bookRoutes)
app.use('/user',userRoutes)

module.exports = app