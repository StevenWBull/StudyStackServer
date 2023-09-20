const express = require('express');
const router = express.Router();
const authController = require('../../controller/authController');
const verifyRegisteredUser = require('../../middleware/verifyRegisteredUser');

router
    .route('/register')
    .post(verifyRegisteredUser(), authController.addRegisteredUser);

router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);

module.exports = router;
