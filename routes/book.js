const express = require('express')
const router = express.Router()
const bookController = require('./../controllers/book')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

console.log("test route")
router.post('/',auth,bookController.createBook)
router.put('/:id',auth,bookController.updateBookId)
router.delete('/:id',auth,bookController.deleteBookId)
router.get('/:id',auth,bookController.getBookId)
router.get('/',auth,bookController.getAllBook)

module.exports = router