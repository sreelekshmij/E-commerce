const express = require('express')
const router = express.Router()
const { authenticateToken, verifyAndAuthenticate, verifyAdmin } = require('../middlewares/auth')
const orderController = require('../controller/orderController')

router.post('/add', authenticateToken, orderController.createOrder);

router.get('/',verifyAndAuthenticate, orderController.getAll)

router
.route('/:id')
.patch( authenticateToken, orderController.updateOrder)
.delete( authenticateToken, orderController.deleteOrder)
.get(authenticateToken, orderController.getOrder)

router.get('/count/:id',verifyAdmin,orderController.getOrderCount)
router.get('/total/totalAmount',verifyAdmin,orderController.getTotalAmount)

module.exports = router;