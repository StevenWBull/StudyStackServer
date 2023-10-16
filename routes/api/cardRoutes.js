const express = require('express');
const router = express.Router();
const cardController = require('../../controller/cardController');
const verifyCardToDelete = require('../../middleware/cardsMiddleware/verifyCardToDelete');
const retrieveCategoryInfo = require('../../middleware/retrieveInfo/retrieveCategoryInfo');
const retrieveStackInfo = require('../../middleware/retrieveInfo/retrieveStackInfo');
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');


router
    .route('/')
    .get(retrieveUserInfo, retrieveCategoryInfo, retrieveStackInfo, cardController.getCards)
    .post(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        cardController.addNewCards
    );

router
    .route('/:cardID')
    .delete(
        retrieveUserInfo,
        retrieveCategoryInfo,
        retrieveStackInfo,
        verifyCardToDelete,
        cardController.deleteCard
    );

module.exports = router;
