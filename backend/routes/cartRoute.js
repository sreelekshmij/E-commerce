const express = require('express')
const router = express.Router()
const { authenticateToken, verifyAndAuthenticate } = require('../middlewares/auth')
const cartController = require('../controller/cartController')

router.post('/add', verifyAndAuthenticate, cartController.createCart);

router
.patch('/:userId',verifyAndAuthenticate, cartController.updateCart)
router.delete('/:userId', verifyAndAuthenticate, cartController.deleteCart)

router.get('/:userId', verifyAndAuthenticate, cartController.getCart)
router.get('/',verifyAndAuthenticate, cartController.getAll);

module.exports = router;