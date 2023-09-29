const { User } = require('../model/userSchema');
const mongoose = require('mongoose');

const addNewStacks = async (req, res) => {
    // User ID
    const userID = req.params.userID;

    // Category ID where you want to add the stacks
    const categoryID = req.params.categoryID;

    // Query user by ID
    const queryID = { _id: userID };

    // Stacks or Stack to be added
    const newStack = req.body;

    // Extract stack title property from array of objects
    const stack_title_array = newStack.map((stack) => {
        return stack.title;
    });
    // Stack object array to insert new stacks
    const stacksToInsert = [];

    // Fill stacksToInsert with new category objects
    for (let i = 0; i < stack_title_array.length; i++) {
        let stackObject = {
            _id: new mongoose.Types.ObjectId(),
            created_at_date: new Date().toDateString(),
            created_at_time: new Date().toTimeString(),
            title: stack_title_array[i],
            cards: [],
        };
        stacksToInsert.push(stackObject);
    }

    try {
        // Find user document by ID and update categories field
        await User.findByIdAndUpdate(
            queryID,
            // Push new stacks to stacks array in user document based on category ID
            {
                $push: {
                    // $[category] is a placeholder for the first element that matches the category ID
                    // the place holder is used in the arrayFilters option below
                    'categories.$[category].stacks': { $each: stacksToInsert },
                },
                // Update the updated_at_date and updated_at_time fields in user document
                $set: {
                    updated_at_date: new Date().toDateString(),
                    updated_at_time: new Date().toTimeString(),
                },
            },
            {
                new: true, // Return updated document
                arrayFilters: [{ 'category._id': categoryID }], // Filter based on category ID
            }
        ).exec();

        return res.status(200).json({
            user_id: userID,
            message: `${
                stack_title_array.length === 1 ? 'Stack' : 'Stacks'
            } added.`,
            // Returns all stacks that were added
            // Look at date and time for newly added fields
            stacks: stacksToInsert,
        });
    } catch (error) {
        return res.status(500).json({
            error: `Cannot add ${
                stack_title_array.length === 1 ? 'stack' : 'stacks'
            }.`,
        });
    }
};

const deleteStacks = async (req, res) => {
    // User ID
    const userID = req.params.userID;
    // Stack ID
    const stackID = req.params.stackID;

    // Query user by ID
    const queryID = { _id: userID };

    try {
        // Find user document by ID and update stacks field
        await User.findByIdAndUpdate(
            queryID,
            // Delete stack from stacks array in userDocument
            {
                $pull: {
                    // $[] is a wildcard that matches all elements in the categories array
                    // each category array will be evaluated to see if it contains the stack ID
                    // if it does, it will be removed
                    'categories.$[].stacks': { _id: stackID },
                },
                // Update the updated_at_date and updated_at_time fields in user document
                $set: {
                    updated_at_date: new Date().toDateString(),
                    updated_at_time: new Date().toTimeString(),
                },
            },

            { new: true }
        ).exec();
        return res.status(200).json({
            _id: userID,
            message: 'Stack deleted.',
        });
    } catch (error) {
        return res.status(500).json({ error: 'Cannot delete stack.' });
    }
};

module.exports = { addNewStacks, deleteStacks };
