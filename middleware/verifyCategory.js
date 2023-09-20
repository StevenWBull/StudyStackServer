const { User } = require('../model/userSchema');

// Middleware to verify categories to be added from a user
const verifyCategories = () => {
    return async (req, res, next) => {
        // Get credientials from request body
        const userID = req.params.userID;
        const newCategories = req.body;

        // Extract category title property from array of objects
        const category_title_array = newCategories.map((category) => {
            return category.title;
        });
        try {
            // Check users collection for a document
            const userDocument = await User.findById(userID).exec();

            // Check the user document for same categories as the ones to be added
            for (const title of category_title_array) {
                // If category title already exists for user, return error
                // Trim whitespace and convert to lowercase for comparison
                if (
                    userDocument.categories.some(
                        (category) => category.title === title
                    )
                ) {
                    return res.status(400).json({
                        error: 'Category(ies) already exists for user.',
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot add category.',
            });
        }
        next();
    };
};

module.exports = verifyCategories;
