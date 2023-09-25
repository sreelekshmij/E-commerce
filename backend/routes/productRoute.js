const express = require('express')
const router = express.Router()
const { verifyAdmin, authenticateToken } = require('../middlewares/auth')
const productController = require('../controller/productController');
// const multer = require('multer');

// const upload = multer({ dest: 'uploads' });

router.post('/add',authenticateToken, productController.createProduct);
router
.route('/:id')
.get(authenticateToken,productController.getProduct)
.patch( verifyAdmin, productController.updateProduct)
.delete( verifyAdmin, productController.deleteProduct)

router.get('/', productController.getProducts);
router.get('/count/:id',verifyAdmin,productController.getProductCount)
router.get('/stock/totalStock',productController.getStockTotal)

module.exports = router;