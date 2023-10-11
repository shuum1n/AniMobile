const express = require('express');
const router = express.Router()
const ProductController = require('../controllers/productController');



router.get('/products', ProductController.fetchProducts)
router.post('/products', ProductController.createProduct);
router.get('/products/:slug', ProductController.fetchBySlug)
router.delete('/products/:id', ProductController.deleteProduct)
router.put('/products/:id', ProductController.editProduct);


module.exports = router