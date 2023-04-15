const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')

router.post('/signup',controller.signup) 
router.post('/signin',controller.signin) 
router.post('/updateProfileImage',controller.updateProfileImage) 
router.post('/updatePassword',controller.updatePassword)
router.get('/previewUsers',controller.previewUsers)
router.get('/profile',controller.userProfile)

module.exports = router

