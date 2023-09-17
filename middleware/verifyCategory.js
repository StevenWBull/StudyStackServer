const User = require('../model/userSchema');

// Middleware to verify if user can update email and/or password
const verifyCategories = () => {
    return async (req, res, next) => {
        // Get credientials from request body
        const userID = req.body.user_id;
        const newCategories_title = req.body.title;

        // Create a categories array
        const category_title_array = newCategories_title.split(',');
        try {
            // Check users collection for a document
            const existingDoc = await User.findOne({
                _id: userID,
            }).exec();
            // Check the user document for same categories as the ones to be added
            for (const title of category_title_array) {
                if (
                    existingDoc.categories.some(
                        (category) => category.title.trim() === title
                    )
                ) {
                    return res.status(400).json({
                        error: `Category ${title} already exists for ${existingDoc.first_name}.`,
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                error: 'Cannot update user.',
            });
        }
        next();
    };
};

module.exports = verifyCategories;
