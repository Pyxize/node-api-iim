const jsonToken = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        let token = req.headers.authorization
        token = token.substring(7)
       // console.log('token', token)
        const decodedToken = jsonToken.verify(token,'jesuissecret');
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'pas bon ID'
        }
        else{
            next();
        }
    } catch{
        res.status(401).json({
            error: new Error('request pas valid')
        })
    }
}