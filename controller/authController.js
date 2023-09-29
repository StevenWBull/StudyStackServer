const { User } = require('../model/userSchema');

const addRegisteredUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { first_name, last_name, email, pword } = req?.body;

    // Check if all fields are filled
    if (!first_name || !last_name || !email || !pword) {
        return res.status(400).json({
            error: 'first_name, last_name, email, and pword request variables are required',
        });
    }

    try {
        // Make a new user via the User schema template
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            pword: pword,
        });

        res.status(201).json({
            message: 'User successfully created.',
            user: user,
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Could not register user.',
            error: err.message,
        });
    }
};

const loginUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { email, pword } = req?.body;

    if (!email || !pword) {
        return res
            .status(401)
            .json({ error: 'Email and password are required.' });
    }

    try {
        // Find user in database
        const loginInfo = await User.findOne({
            email,
            pword,
        }).exec();

        // If user exists, return user info
        if (loginInfo) {
            return res.status(200).json({
                message: `User logged in.`,
                login: loginInfo,
            });
        } else {
            return res.status(404).json({
                message: `User not found.`,
            });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Could not login user.' });
    }
};

const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: `User has logged out.`,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: 'Could not log out.', error: error.message });
    }
};

module.exports = { addRegisteredUser, loginUser, logoutUser };
