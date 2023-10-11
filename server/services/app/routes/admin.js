const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const CategoryController = require('../controllers/categoryController');
const AuthController = require('../controllers/authController');

router.post('/products', ProductController.createProduct);
router.post('/register/admin', AuthController.registerAdmin);
router.put('/products/:id', ProductController.editProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory)
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;