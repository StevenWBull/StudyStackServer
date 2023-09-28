const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserPatch = require('../../middleware/verifyUserPatch');

/* Request email, pword for finding the user. 
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
    .route('/user')
    .get(userController.getUser)
    .patch(verifyUserPatch, userController.patchUser);

module.exports = router;
