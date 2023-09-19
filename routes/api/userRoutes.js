const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');

router.route('/user').patch(verifyUserUpdate(), userController.updateUserInfo);

module.exports = router;
