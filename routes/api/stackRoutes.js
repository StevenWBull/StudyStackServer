const express = require('express');
const router = express.Router();
const stackController = require('../../controller/stackController');
const retrieveCategoryInfo = require('../../middleware/retrieveInfo/retrieveCategoryInfo');
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');
const verifyNewStacks = require('../../middleware/stacksMiddleware/verifyNewStacks');
const verifyStackToDelete = require('../../middleware/stacksMiddleware/verifyStackToDelete');

router
    .route('/')
    .get(retrieveUserInfo, retrieveCategoryInfo, stackController.getStacks)
    .post(retrieveUserInfo, retrieveCategoryInfo, verifyNewStacks, stackController.addNewStacks);

router
    .route('/:stackID')
    .delete(retrieveUserInfo, retrieveCategoryInfo, verifyStackToDelete, stackController.deleteStack);

module.exports = router;