const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');

router.route('/user').patch(verifyUserUpdate(), userController.updateUserInfo);
router
    .route('/categories')
    .post(verifyCategories(), categoryController.addNewCategories);
router
    .route('/categories/:id')
    .get(categoryController.getCategories)
    .delete(verifyCategoryToDelete(), categoryController.deleteCategories);

module.exports = router;
