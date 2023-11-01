const { Card } = require('../model/userSchema');

// Get all cards from a specified userID and stackID
const getCards = async (req, res) => {
    const user = req.user;
    const category = req.category;
    const stack = req.stack;
    const cards = user.categories.id(category._id).stacks.id(stack._id).cards;

    try {
        if (cards.length === 0) {
            return res.status(200).json({
                message: `No cards found for stack ${stack.title}.`,
            });
        } else {
            return res.status(200).json({
                message: 'Cards found.',
                userID: user._id,
                stack: stack.title,
                cards: cards,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot get cards.',
            error: err.message,
        });
    }
};

// Add new cards to a user via the stackID. Allows for multiple cards to be added at once.
const addNewCards = async (req, res) => {
    const user = req.user;
    const category = req.category;
    const stack = req.stack;
    const { newCards } = req?.body;

    try {
        // Loop through the object array and generate a new card for each
        for (c in newCards) {
            const card = await Card.create({
                content: newCards[c].content,
                answer: newCards[c].answer,
            });
            user.categories
                .id(category._id)
                .stacks.id(stack._id)
                .cards.push(card);
        }

        await user.save();

        return res.status(200).json({
            message: `Cards added.`,
            user: user._id,
            cards: user.categories.id(category._id).stacks.id(stack._id).cards,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot add cards',
            error: err.message,
        });
    }
};

// Update card using its ID
const updateCard = async (req, res) => {
    const user = req.user;
    const stack = user.categories.id(req.category._id).stacks.id(req.stack._id);
    const cardID = req.params.cardID;

    try {
        const card = stack.cards.id(cardID);
        if (req.body.cardUpdates.content)
            card.content = req.body.cardUpdates.content;
        if (req.body.cardUpdates.answer)
            card.answer = req.body.cardUpdates.answer;

        await user.save();

        return res.status(200).json({
            message: 'Card updated.',
            user: user,
            cardUpdated: card,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot update card.',
            error: err.message,
        });
    }
};

// Remove card from a stack using its ID
const deleteCard = async (req, res) => {
    const user = req.user;
    const stack = user.categories.id(req.category._id).stacks.id(req.stack._id);
    const cardID = req.params.cardID;

    try {
        stack.cards.id(cardID).deleteOne();
        await user.save();

        return res.status(200).json({
            message: 'Card deleted.',
            user: user._id,
            stack: stack,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete card.',
            error: err.message,
        });
    }
};

module.exports = {
    addNewCards,
    getCards,
    updateCard,
    deleteCard,
};
