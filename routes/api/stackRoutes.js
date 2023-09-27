const express = require('express');
const router = express.Router();
const verifyStacks = require('../../middleware/verifyStack');
const verifyStackToDelete = require('../../middleware/verifyStackToDelete');
const stackController = require('../../controller/stackController');

// To find the stack subdocument within the user document we need both
// the userID and the categoryID
router
    .route('/stacks/:userID/category/:categoryID')
    .post(verifyStacks(), stackController.addNewStacks);

router
    .route('/user/:userID/stack/:stackID')
    .delete(verifyStackToDelete(), stackController.deleteStacks);

module.exports = router;
