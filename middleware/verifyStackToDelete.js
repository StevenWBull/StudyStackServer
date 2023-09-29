const { User } = require('../model/userSchema');

// Middleware to verify if user can delete stack
const verifyStackToDelete = () => {
    return async (req, res, next) => {
        // User ID
        const userID = req.params.userID;
        // Stack ID
        const stackID = req.params.stackID;

        try {
            // Get user document by userID
            const userDocument = await User.findById(userID).exec();

            // Find the category containing the stack by stack ID
            const stackExists = userDocument.categories.find((category) => {
                return category.stacks.some(
                    (stack) => stack._id.toString() === stackID
                );
            });

            // If stack does not exist for user, return error
            if (!stackExists) {
                return res.status(400).json({
                    error: 'Stack does not exists for user.',
                });
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot delete stack.',
            });
        }
        next();
    };
};
module.exports = verifyStackToDelete;
