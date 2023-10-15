const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');
const isRegisteredUser = require('../../middleware/userMiddleware/isRegisteredUser');

router
    .route('/register')
    .post(isRegisteredUser, authController.addRegisteredUser);

router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;
