const express = require('express');
const authController = require('../controller/authController');
const router = express.Router()


router.post('/register',authController.createUser);
router.post('/login',authController.loginUser);
router.post('/forgot-password',authController.forgotPass);
router.post('/reset-password',authController.resetPass)
router.post('/verify',authController.verifyUser)
module.exports = router;