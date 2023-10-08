const { User, Category } = require('../model/userSchema');

// Get a category from the userID provided in the req.body
const getCategory = async (req, res) => {
    const { categoryID } = req?.params;
    const user = req.user;

    try {
        // Find the category subdocument within the user document by its ID
        const category = user.categories.id(categoryID);

        if (category) {
            return res.status(200).json({
                message: 'Category found.',
                userID: user._id,
                category: category,
            });
        } else {
            return res.status(404).json({
                message: 'Category not found.',
            });
        }
    } catch (err) {
        return res.status(500).json({ 
            message: 'Cannot get category.',
            error: err.message,
        });
    }
};

// Get all categories from the userID provided in the req.body
const getAllCategories = async (req, res) => {
    const user = req.user;

    try {
        // If length of categories array is 0, then no categories exist
        if (user.categories.length === 0) {
            return res.status(200).json({
                message: 'No categories found for user.',
            });
        } else {
            return res.status(200).json({
                message: 'Categories found.',
                userID: user._id,
                categories: user.categories,
            });
        }
    } catch (err) {
        return res.status(500).json({ 
            message: 'Cannot get categories.',
            error: err.message,
        });
    }
};

// Add new categories to a userID. Allows for multiple categories to be added at once.
const addNewCategories = async (req, res) => {
    const { newCategories } = req?.body;
    const user = req.user;

    try {
        // Loop through the object array and generate a new category for each
        for (c in newCategories) {
            const category = await Category.create({
                title: newCategories[c].title,
            });
            user.categories.push(category);
        }

        await user.save();

        return res.status(200).json({
            message: `Categories added.`,
            user: user._id,
            categories: user.categories,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot add categories',
            error: err.message,
        });
    }
};

// Remove category from a userID using a category ID. 
const deleteCategories = async (req, res) => {
    const categoryID = req.params.categoryID;
    const user = req.user;

    try {
        user.categories.id(categoryID).deleteOne();
        await user.save();

        return res.status(200).json({
            message: 'Category deleted.',
            user: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete category.',
            error: err.message,
        });
    }
};

module.exports = {
    getCategory,
    getAllCategories,
    addNewCategories,
    deleteCategories,
};
