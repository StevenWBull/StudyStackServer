const { User } = require('../model/userSchema');

// Middleware to verify stacks to be added from a user

const verifyStacks = () => {
    return async (req, res, next) => {
        // Get credientials from request body
        const userID = req.params.userID;
        const newStack = req.body;

        // Extract stack title property from array of objects
        const stack_title_array = newStack.map((stack) => {
            return stack.title;
        });
        try {
            // Check users collection for a document
            const userDocument = await User.findById(userID).exec();

            // Check the user document for same stacks as the ones to be added
            for (const title of stack_title_array) {
                // If stack title already exists for user, return error
                if (
                    userDocument.categories.some((category) =>
                        category.stacks.some((stack) => stack.title === title)
                    )
                ) {
                    return res.status(400).json({
                        error: 'Stack(s) already exists for user.',
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot add stack.',
            });
        }
        next();
    };
};

module.exports = verifyStacks;
