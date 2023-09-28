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

const postUser = async (req, res) => {
    if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.pword
    ) {
        return res.status(400).json({
            error: 'first_name, last_name, email, and pword request variables are required',
        });
    }

    // Make a new user via the User schema template
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pword: req.body.pword,
    });

    try {
        // Save user to DB
        await user.save();
        res.status(200).json({
            message: 'User successfully created.',
            user: user,
        });
    } catch (err) {
        err.message;
    }
};

// req.user and req.filter are checked for in verifyUserPatch and stored in the request so that they can be accessed here.
const patchUser = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate(req.user, req.filter, {
            new: true
        });
        return res
            .status(200)
            .json({ message: 'User updated.', oldUserInfo: req.user, currentUserInfo: user});
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
