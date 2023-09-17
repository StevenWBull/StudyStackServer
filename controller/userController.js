const User = require('../model/userSchema');

const updateUserInfo = async (req, res) => {
    // All possible fields to update
    const userID = req.body.user_id;
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const newEmail = req.body.email;
    const newPassword = req.body.newPassword;

    // Query user by ID
    const queryID = { _id: userID };

    // Create an update object
    const fieldsToUpdate = {};

    // Check which fields are filled, add to fieldsToUpdate object if field is filled
    if (newFirstName) fieldsToUpdate.first_name = newFirstName;
    if (newLastName) fieldsToUpdate.last_name = newLastName;
    if (newEmail) fieldsToUpdate.email = newEmail;
    if (newPassword) fieldsToUpdate.pword = newPassword;

    // Update the time document was updated
    fieldsToUpdate.created_at = new Date().toTimeString();

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
            .json({ message: 'User updated.', updateUser: updatedDoc });
    } catch (error) {
        return res.status(500).json({
            error: 'Cannot update user.',
        });
    }
};

module.exports = { updateUserInfo };
