const { User } = require('../model/userSchema');
const mongoose = require('mongoose');

const getCategory = async (req, res) => {
    // User ID
    const userID = req.params.userID;
    // Category ID
    const categoryID = req.params.categoryID;

    try {
        // Get user document by userID
        const userDocument = await User.findById(userID).exec();

        // Find the category subdocument within the user document by its ID
        const categorySubdocument = userDocument.categories.id(categoryID);

        if (categorySubdocument) {
            return res.status(200).json({
                message: 'Category found.',
                category: categorySubdocument,
            });
        } else {
            return res.status(400).json({
                message: 'Category not found.',
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Cannot get category.' });
    }
};

const getAllCategories = async (req, res) => {
    //  User ID
    const userID = req.params.userID;

    try {
        // Get user document by ID
        const userDocument = await User.findById(userID).exec();

        // If length of categories array is 0
        if (userDocument.categories.length === 0) {
            return res.status(200).json({
                message: 'No categories found for user.',
            });
        } else {
            return res.status(200).json({
                user_id: userID,
                message: 'Categories found.',
                categories: userDocument.categories,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Cannot get categories.' });
    }
};

const addNewCategories = async (req, res) => {
    // User ID
    const userID = req.params.userID;

    // Query user by ID
    const queryID = { _id: userID };

    // Categories or category to be added
    const newCategories = req.body;

    // Extract category title property from array of objects
    const category_title_array = newCategories.map((category) => {
        return category.title;
    });
    // Category object array to insert new categories
    const categoriesToInsert = [];

    // Fill categoriesToInsert with new category objects
    for (let i = 0; i < category_title_array.length; i++) {
        let categoryObject = {
            _id: new mongoose.Types.ObjectId(),
            created_at_date: new Date().toDateString(),
            created_at_time: new Date().toTimeString(),
            title: category_title_array[i],
            stacks: [],
        };
        categoriesToInsert.push(categoryObject);
    }

    try {
        // Find user document by ID and update categories field
        await User.findByIdAndUpdate(
            queryID,
            // Push new categories to categories array in user document
            { $push: { categories: { $each: categoriesToInsert } } },
            { new: true } // Return updated document
        ).exec();

        return res.status(200).json({
            user_id: userID,
            message: `${category_title_array.length === 1 ? 'Category' : 'Categories'} added.`,
            // Returns all categories that were added
            // Look at date and time for newly added fields
            categories: categoriesToInsert,
        });
    } catch (error) {
        return res.status(500).json({ error: `Cannot add ${category_title_array.length === 1 ? 'category' : 'categories'}.` });
    }
};

const deleteCategories = async (req, res) => {
    // User ID
    const userID = req.params.userID;
    // Category ID
    const categoryID = req.params.categoryID;

    // Query user by ID
    const queryID = { _id: userID };

    try {
        // Find user document by ID and update categories field
        await User.findByIdAndUpdate(
            queryID,
            // Delete categories from categories array in userDocument
            {
                $pull: {
                    categories: { _id: categoryID },
                },
            },

            { new: true }
        ).exec();
        return res.status(200).json({
            _id: userID,
            message: 'Category deleted.',
        });
    } catch (error) {
        return res.status(500).json({ error: 'Cannot delete category.' });
    }
};

module.exports = {
    getCategory,
    getAllCategories,
    addNewCategories,
    deleteCategories,
};
