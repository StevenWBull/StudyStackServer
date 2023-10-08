const express = require('express');
const router = express.Router();
const retrieveUserInfo = require('../../middleware/retrieveUserInfo');
const verifyCategories = require('../../middleware/verifyNewCategories');
const verifyCategoryToDelete = require('../../middleware/verifyCategoryToDelete');
const categoryController = require('../../controller/categoryController');


router
    .route('/')
    .get(retrieveUserInfo, categoryController.getAllCategories)
    .post(retrieveUserInfo, verifyCategories, categoryController.addNewCategories);

// To find the category subdocument within the user document we need both the userID and the categoryID
router
    .route('/:categoryID')
    .get(retrieveUserInfo, categoryController.getCategory)
    .delete(retrieveUserInfo, verifyCategoryToDelete, categoryController.deleteCategories);

module.exports = router;
