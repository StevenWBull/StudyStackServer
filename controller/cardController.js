const { User, Card } = require('../model/userSchema');
const mongoose = require('mongoose');

const addNewCard = async (req, res) => {
    const userID = req.params.userID;
    const categoryID = req.params.categoryID;
    const stackID = req.params.stackID;

    const newCard = new Card({
        stack_id: stackID,
        content: req.body.content,
        answer: '',
        created_at: new Date().toUTCString(),
    });
};
