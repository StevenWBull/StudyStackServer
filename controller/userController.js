const { User } = require('../model/userSchema');

const updateUserInfo = async (req, res) => {
    // Get Crendientals from request body
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const newEmail = req.body.email;
    const newPassword = req.body.new_pword;

    // User ID
    const userID = req.body._id;

    // Query user by ID
    const queryID = { _id: userID };

    // Create an update object
    const fieldsToUpdate = {};

    // Check which fields are filled, add to fieldsToUpdate object if field is filled
    if (newFirstName) fieldsToUpdate.first_name = newFirstName;
    if (newLastName) fieldsToUpdate.last_name = newLastName;
    if (newEmail) fieldsToUpdate.email = newEmail;
    if (newPassword) fieldsToUpdate.pword = newPassword;

    // Update the date in  user document
    fieldsToUpdate.updated_at_date = new Date().toDateString();

    // Update the time in user document
    fieldsToUpdate.updated_at_time = new Date().toTimeString();

    try {
        // Find user document by ID and update
        const updatedDoc = await User.findByIdAndUpdate(
            queryID,
            fieldsToUpdate,
            {
                new: true, // Return updated document
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

module.exports = {
    updateUserInfo,
};
