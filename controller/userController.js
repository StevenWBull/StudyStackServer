const { User } = require('../model/userSchema');

const getUser = async (req, res) => {
    if (!req.body.email || !req.body.pword) {
        // 400 Bad Request
        return res.status(400).json({
            error: 'Email and pword request variables are required',
        });
    }
    try {
        // Find user via built in schema function
        const user = await User.findOne({
            email: req.body.email,
            pword: req.body.pword,
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

// req.user and req.filter are checked for in verifyUserPatch and stored in the request so that they can be accessed here.
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
            error: err.message,
        });
    }
};

module.exports = {
    getUser,
    postUser,
    patchUser,
};
