const express = require('express');
const router = express.Router();
const cardController = require('../../controller/cardController');
const verifyCardExists = require('../../middleware/cardsMiddleware/verifyCardExists');
const retrieveCategoryInfo = require('../../middleware/retrieveInfo/retrieveCategoryInfo');
const retrieveStackInfo = require('../../middleware/retrieveInfo/retrieveStackInfo');
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');

router
    .route('/')
    .get(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        cardController.getCards
    )
    .post(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        cardController.addNewCards
    );

router
    .route('/:cardID')
    .patch(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        verifyCardExists,
        cardController.updateCard
    )
    .delete(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        verifyCardExists,
        cardController.deleteCard
    );

module.exports = router;
