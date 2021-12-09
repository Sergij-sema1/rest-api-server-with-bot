const express = require('express');
const router = express.Router();
const controllers = require('../controller/controllers');
const verifyJwt = require('../middleware/verifyJwt');

router.get('/get/users/data', verifyJwt, controllers.usersData());
router.post('/registration', controllers.usersRegistration());
router.post('/login', controllers.usersLogin());
router.put('/update/users/data', verifyJwt, controllers.updateUser());

router.get('/get/configuration/models', verifyJwt, controllers.getModels());
router.post('/add/configuration/models', verifyJwt, controllers.addModels());
router.put('/update/configuration/models', verifyJwt, controllers.updateModels());
router.delete('/delete/configuration/models', verifyJwt, controllers.deleteModels());

router.get('/get/configuration/tastes', verifyJwt, controllers.getTastes());
router.post('/add/configuration/tastes', verifyJwt, controllers.addTastes());
router.put('/update/configuration/tastes', verifyJwt, controllers.updateTastes());
router.delete('/delete/configuration/tastes', verifyJwt, controllers.deleteTastes());

router.get('/get/delivery/type', verifyJwt, controllers.getDeliveryMethods());
router.put('/update/delivery/type', verifyJwt, controllers.updateDeliveryMethods());

router.get('/get/products', verifyJwt, controllers.getProductModels());
router.post('/add/products', verifyJwt, controllers.addProductModels());
router.delete('/delete/products', verifyJwt, controllers.deleteProductModels());
router.get('/get/product/tastes', verifyJwt, controllers.getProductTastes());
router.put('/update/update/Products/Price', verifyJwt, controllers.updateProductsPrice());

module.exports = router;
