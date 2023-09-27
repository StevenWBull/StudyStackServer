const { User } = require('../model/userSchema');

// Middleware to verify if user can delete a category
const verifyCategoryToDelete = () => {
    return async (req, res, next) => {
        // User ID
        const userID = req.params.userID;
        // Category ID
        const categoryID = req.params.categoryID;

        try {
            // Get user document by userID
            const userDocument = await User.findById(userID).exec();
            // Find the category subdocument within the user document by its ID
            const categorySubdocument = userDocument.categories.id(categoryID);
            {
                // If category subdocument does not exist, return error
                if (!categorySubdocument) {
                    return res.status(400).json({
                        error: 'Category does not exists for user.',
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot delete category.',
            });
        }
        next();
    };
};
module.exports = verifyCategoryToDelete;
