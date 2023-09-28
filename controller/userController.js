const { User } = require('../model/userSchema');

// Req needs to include email and pword(password).
const getUser = async (req, res) => {
    if(!req.body.email || !req.body.pword) {
        return res.status(400).json({
            error: 'Email and pword request variables are required'
        });
    }
    try {
        const user = await User.findOne({
            email: req.body.email,
            pword: req.body.pword
        });

        if (user) {
            return res.status(200).json({
                message: 'User found.',
                user: user,
            });
        } else {
            return res.status(404).json({
                message: 'User not found.',
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Cannot get user.' });
    }
};

const postUser = async (req, res) => {
    if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.pword) {
        return res.status(400).json({
            error: 'first_name, last_name, email, and pword request variables are required'
        });
    }

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pword: req.body.pword
    });

    try {
        await user.save();
        res.status(200).json({
            message: "User successfully created.",
            user: user
        })
    } catch (err) {
        err.message;
    }
}

const patchUser = async (req, res) => {
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
    fieldsToUpdate.updated_at = new Date().toUTCString();

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
    getUser,
    postUser,
    patchUser,
};
