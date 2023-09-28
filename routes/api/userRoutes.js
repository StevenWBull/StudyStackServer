const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserUpdate = require('../../middleware/verifyUserUpdate');

router
    .route('/user')
    .get(userController.getUser)
    .post(userController.postUser)
    .patch(verifyUserUpdate(), userController.patchUser);

module.exports = router;
