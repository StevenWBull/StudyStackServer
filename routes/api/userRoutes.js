const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');
const verifyCategories = require('../../middleware/verifyCategory');

router.route('/user').patch(verifyUserUpdate(), userController.updateUserInfo);
router
    .route('/categories')
    .post(verifyCategories(), userController.addNewCategories);

module.exports = router;
