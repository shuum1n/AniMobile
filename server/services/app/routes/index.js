const express = require('express');
const router = express.Router();
const authentication = require('./authentication');
const authMiddleware = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');
const products = require('./products');
const adminGuard = require('../middleware/authorization');
const admin = require('./admin');
const category = require('./category');


router.use(products);
router.use(category);





router.use(errorHandler);

module.exports = router;
