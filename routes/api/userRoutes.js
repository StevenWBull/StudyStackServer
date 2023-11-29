const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserPatch = require('../../middleware/retrieveInfo/retrieveUserInfo');

/* 
Patch User:
new_first_name, new_last_name, new_email, new_pword should be used when updating user info.
    Example: A request is made to change the user's email.
        The req looks like:
            {
                "email": "jtyler@hotmail.com",
                "pword": "pword",
                "new_email": "jmattyler@gmail.com"
            }
*/
router
    .route('/')
    .get(userController.getUser)
    .patch(verifyUserPatch, userController.patchUser);

module.exports = router;
