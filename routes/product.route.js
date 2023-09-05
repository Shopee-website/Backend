const express = require('express');
const ProductApiControllers = require('../controllers/api/product.controller')
const router = express.Router();
const {uploadImage} = require('../middleware/uploadImage') 

router.get('/', ProductApiControllers.getListProduct)

router.get('/sale/', ProductApiControllers.getSaleProducts)

router.get('/info/:id', ProductApiControllers.getProductInfo)

router.get('/:id', ProductApiControllers.getProductById)

router.get('/category/:id', ProductApiControllers.getProductByCategoryId)

// router.post('/', uploadImage("product_images").array("images", 20), ProductApiControllers.createNewProduct)

router.post('/',  ProductApiControllers.createNewProduct)


router.patch('/:id', ProductApiControllers.updateById)

router.delete('/:id', ProductApiControllers.softDeleteById)

module.exports = router