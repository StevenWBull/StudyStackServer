const express = require('express');
const router = express.Router();
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');
const verifyCategories = require('../../middleware/categoryMiddleware/verifyNewCategories');
const verifyCategoryToDelete = require('../../middleware/categoryMiddleware/verifyCategoryToDelete');
const categoryController = require('../../controller/categoryController');

// Get all categories or post more categories to a user via their ID
router
    .route('/')
    .get(retrieveUserInfo, categoryController.getAllCategories)
    .post(
        retrieveUserInfo,
        verifyCategories,
        categoryController.addNewCategories
    );

// Get or delete a category by the user's ID and a given category ID 
router
    .route('/:categoryID')
    .get(retrieveUserInfo, categoryController.getCategory)
    .delete(
        retrieveUserInfo,
        verifyCategoryToDelete,
        categoryController.deleteCategories
    );

module.exports = router;
