const User = require('../model/userSchema');

// Middleware to verify if user can update email and/or password
const verifyCategories = () => {
    return async (req, res, next) => {
        // Get credientials from request body
        const userID = req.body._id;
        const newCategories_title = req.body.title;

        // Create a categories array of title property values
        const category_title_array = newCategories_title.split(',');
        try {
            // Check users collection for a document
            const userDocument = await User.findById(userID).exec();
            // Check the user document for same categories as the ones to be added
            for (const title of category_title_array) {
                // If category title already exists for user, return error
                // Trim whitespace and convert to lowercase for comparison
                if (
                    userDocument.categories.some(
                        (category) =>
                            category.title.trim().toLowerCase() ===
                            title.trim().toLowerCase()
                    )
                ) {
                    return res.status(400).json({
                        error: 'Category already exists for user.',
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