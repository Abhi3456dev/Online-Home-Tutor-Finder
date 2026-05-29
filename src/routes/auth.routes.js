const express = require('express')
const router = express.Router()
const { register, login, logout, getMe } = require('../controllers/auth.controllers')
const { protect } = require('../middlewares/auth.middleware')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protect, getMe)   // protected route example

module.exports = router