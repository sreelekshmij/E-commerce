const express = require('express')
const router = express.Router()
const { verifyAdmin, authenticateToken } = require('../middlewares/auth')
const userController = require('../controller/userController')

router
.route('/:id')
.patch(authenticateToken, userController.updateUser)
.get(authenticateToken,userController.getUser)
.delete(authenticateToken, userController.deleteUser)
router.get('/',verifyAdmin, userController.getUsers)
router.get('/count/:id',verifyAdmin,userController.getUserCount)


module.exports = router;