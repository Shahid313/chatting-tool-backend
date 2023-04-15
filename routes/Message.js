const express = require('express')
const router = express.Router()

const controller = require('../controllers/MessageController')

router.post('/send',controller.sendMessage) 
router.get('/previewMessages',controller.previewMessages)
router.get('/deleteMessage',controller.deleteMessage) 
router.post('/like',controller.like)

module.exports = router