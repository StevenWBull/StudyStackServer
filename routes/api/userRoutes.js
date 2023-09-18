const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');
const verifyCategories = require('../../middleware/verifyCategory');
const verifyCategoryToDelete = require('../../middleware/verifyCategoryToDelete');

router.route('/user').patch(verifyUserUpdate(), userController.updateUserInfo);
router
    .route('/categories')
    .post(verifyCategories(), userController.addNewCategories);
router
    .route('/categories/:id')
    .get(userController.getCategories)
    .delete(verifyCategoryToDelete(), userController.deleteCategories);

module.exports = router;
