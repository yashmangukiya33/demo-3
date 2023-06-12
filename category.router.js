const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/category');

router.post('/addcategory',CategoryController.createCategory );
router.get('/', CategoryController.getAllCategorys);
router.get('/:id',CategoryController.getCategoryById );
router.put('/:id',CategoryController.updateCategoryById);
router.delete('/:id',CategoryController.deleteCategoryById);


module.exports = router;
