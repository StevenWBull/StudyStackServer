const { Stack } = require('../model/userSchema');

// Get all stacks from a specified userID and categoryID
const getStacks = async (req, res) => {
    const user = req.user;
    const category = req.category;
    const categoryTitle = user.categories.id(category._id).title;
    const stacks = user.categories.id(category._id).stacks;

    try {
        // If length of stacks is 0, then no stacks exist
        if (stacks.length === 0) {
            return res.status(200).json({
                message: `No stacks found for category ${categoryTitle}.`,
            });
        } else {
            return res.status(200).json({
                message: 'Stacks found.',
                userID: user._id,
                category: categoryTitle,
                stacks: stacks,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot get stacks.',
            error: err.message,
        });
    }
};

// Add new stacks to a userID and categoryID. Allows for multiple stacks to be added at once.
const addNewStacks = async (req, res) => {
    const user = req.user;
    const category = req.category;
    const { newStacks } = req?.body;

    try {
        // Loop through the object array and generate a new stack for each
        for (s in newStacks) {
            const stack = await Stack.create({
                title: newStacks[s].title,
            });
            user.categories.id(category._id).stacks.push(stack);
        }

        await user.save();

        return res.status(200).json({
            message: `Stacks added.`,
            user: user._id,
            stacks: user.categories.id(category._id).stacks,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot add stacks',
            error: err.message,
        });
    }
};

// Remove stack from a category using its ID
const deleteStack = async (req, res) => {
    const user = req.user;
    const category = user.categories.id(req.category._id);
    const stackID = req.params.stackID;

    try {
        category.stacks.id(stackID).deleteOne();
        await user.save();

        return res.status(200).json({
            message: 'Stack deleted.',
            user: user._id,
            category: category,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete stack.',
            error: err.message,
        });
    }
};

module.exports = {
    getStacks,
    addNewStacks,
    deleteStack,
};
