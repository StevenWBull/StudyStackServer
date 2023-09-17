const User = require('../model/userSchema');
const mongoose = require('mongoose');

const updateUserInfo = async (req, res) => {
    // All possible fields to update
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const newEmail = req.body.email;
    const newPassword = req.body.newPassword;

    // User ID
    const userID = req.body.user_id;

    // Query user by ID
    const queryID = { _id: userID };

    // Create an update object
    const fieldsToUpdate = {};

    // Check which fields are filled, add to fieldsToUpdate object if field is filled
    if (newFirstName) fieldsToUpdate.first_name = newFirstName;
    if (newLastName) fieldsToUpdate.last_name = newLastName;
    if (newEmail) fieldsToUpdate.email = newEmail;
    if (newPassword) fieldsToUpdate.pword = newPassword;

    // Update the date document was updated
    fieldsToUpdate.created_at_date = new Date().toDateString();
    // Update the time document was updated
    fieldsToUpdate.created_at_time = new Date().toTimeString();

    try {
        const updatedDoc = await User.findByIdAndUpdate(
            queryID,
            fieldsToUpdate,
            {
                new: true,
            }
        ).exec();
        return res
            .status(200)
            .json({ message: 'User updated.', updatedUser: updatedDoc });
    } catch (error) {
        return res.status(500).json({
            error: 'Cannot update user.',
        });
    }
};

const addNewCategories = async (req, res) => {
    // User ID
    const userID = req.body.user_id;

    // Query user by ID
    const queryID = { _id: userID };

    // Categories to be added
    const newCategories_title = req.body.title;

    // Create a categories array
    const newCategoriesArray = newCategories_title.split(',');

    // Category object array to insert new categories
    const categoriesToInsert = [];

    // Fill categoriesToInsert with new category objects
    for (let i = 0; i < newCategoriesArray.length; i++) {
        let categoryObject = {
            _id: new mongoose.Types.ObjectId(),
            created_at_date: new Date().toDateString(),
            created_at_time: new Date().toTimeString(),
            title: newCategoriesArray[i].trim(), // Trim whitespace
            stacks: [],
        };
        categoriesToInsert.push(categoryObject);
    }

    try {
        const addedCategories = await User.findOneAndUpdate(
            queryID,
            // Push new categories to categories array in user document
            { $push: { categories: { $each: categoriesToInsert } } },
            { new: true }
        ).exec();

        return res.status(200).json({
            user_id: userID,
            message: 'Category(ies) added.',
            categories: addedCategories.categories,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Cannot add category(ies).' });
    }
};

module.exports = { updateUserInfo, addNewCategories };
