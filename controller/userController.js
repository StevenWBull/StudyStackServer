const { User } = require('../model/userSchema');

const getUser = async (req, res) => {
    const { email, pword } = req?.body;
    if (!email || !pword) {
        // 400 Bad Request
        return res.status(400).json({
            error: 'Email and pword request variables are required',
        });
    }
    try {
        // Find user via built in schema function
        const user = await User.findOne({
            email: email,
            pword: pword,
        });

        if (user) {
            // 200 OK
            return res.status(200).json({
                message: 'User found.',
                user: user,
            });
        } else {
            // 404 Not Found
            return res.status(404).json({
                message: 'User not found.',
            });
        }
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ error: err.message });
    }
};

// Update User info from the req.user and req.filter variables. These are passed from the verifyUserPatch middleware.
const patchUser = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate(req.user, req.filter, {
            new: true,
        });
        return res.status(200).json({
            message: 'User updated.',
            oldUserInfo: req.user,
            currentUserInfo: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error updating User info",
            error: err.message,
        });
    }
};

module.exports = {
    getUser,
    patchUser,
};
