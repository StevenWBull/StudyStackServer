const { Category } = require('../../model/userSchema');

// Middleware to find and return a category via its ID
const retrieveCategoryInfo = async (req, res, next) => {
    const categoryID = req.body.categoryID;

    if (!categoryID) {
        return res.status(400).json({
            error: 'categoryID field is required.',
        });
    }
    try {
        // Check if category exists
        const category = await Category.findById(categoryID);

        if (!category) {
            // 404 Not Found
            return res.status(404).json({
                error: 'No category with the given ID exists.',
            });
        }

        // If user exists store info in the req
        req.category = category;
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
    next();
};

module.exports = retrieveCategoryInfo;
