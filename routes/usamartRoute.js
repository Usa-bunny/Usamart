const express = require('express');
const router = express.Router();
const usamartController = require('../controllers/usamartController.js');
const uploadImage = require('../middleware/upload');

router.get('/item', usamartController.getAllItem);
router.get('/item/delete/:id', usamartController.deleteItem);
router.post('/item/add', uploadImage.single('item_image'), usamartController.addItem);
router.post('/item/edit/:id', uploadImage.single('item_image'), usamartController.editItem);

router.get('/category', usamartController.getCategory);
router.post('/category/add', usamartController.addCategory);
router.post('/category/edit/:id', usamartController.editCategory);
router.get('/category/delete/:id', usamartController.deleteCategory);
router.post('/item/setCategory/:id', usamartController.setCategory);

module.exports = router;
