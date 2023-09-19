const express = require('express');
const router = express.Router();
const verifyCategories = require('../../middleware/verifyCategory');
const verifyCategoryToDelete = require('../../middleware/verifyCategoryToDelete');
const categoryController = require('../../controller/categoryController');

router
    .route('/categories/:id')
    .get(categoryController.getCategories)
    .post(verifyCategories(), categoryController.addNewCategories)
    .delete(verifyCategoryToDelete(), categoryController.deleteCategories);

module.exports = router;
