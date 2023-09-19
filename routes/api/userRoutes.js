const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');
const verifyCategories = require('../../middleware/verifyCategory');
const verifyCategoryToDelete = require('../../middleware/verifyCategoryToDelete');
const categoryController = require('../../controller/categoryController');

router.route('/user').patch(verifyUserUpdate(), userController.updateUserInfo);
router
    .route('/categories')
    .post(verifyCategories(), categoryController.addNewCategories);
router
    .route('/categories/:id')
    .get(categoryController.getCategories)
    .delete(verifyCategoryToDelete(), categoryController.deleteCategories);

module.exports = router;
