const express = require('express');
const router = express.Router();
const verifyCategories = require('../../middleware/verifyCategory');
const verifyCategoryToDelete = require('../../middleware/verifyCategoryToDelete');
const categoryController = require('../../controller/categoryController');

router.route('/categories/:userID').get(categoryController.getAllCategories);

// To find the category subdocument within the user document we need both
// the userID and the categoryID
router
    .route('/user/:userID/category/:categoryID')
    .get(categoryController.getCategory);

//  .post(verifyCategories(), categoryController.addNewCategories)
//   .delete(verifyCategoryToDelete(), categoryController.deleteCategories);

module.exports = router;