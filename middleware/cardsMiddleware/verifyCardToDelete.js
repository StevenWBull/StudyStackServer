// Middleware to verify if the card to be deleted exists
const verifyCardToDelete = async (req, res, next) => {
    const stack = req.user.categories
        .id(req.category._id)
        .stacks.id(req.stack._id);
    const cardID = req.params.cardID;

    try {
        // If card ID does not exist, return error
        if (!stack.cards.id(cardID)) {
            return res.status(400).json({
                error: `Card ${cardID} does not exist for user.`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Error when verifying card.',
            error: err.message,
        });
    }
    next();
};
module.exports = verifyCardToDelete;
