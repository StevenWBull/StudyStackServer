const { User } = require('../model/userSchema');
const jwt = require('jsonwebtoken');

const _generateJWTToken = (user) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' }); // Token expires in 1 week
    return token;
};

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

        const token = _generateJWTToken(newUser);
        res.status(201).json({
            message: 'User successfully created.',
            user: user,
            token: token,
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
        });

        // If user exists, return user info
        if (loginInfo) {
            const token = _generateJWTToken(loginInfo);
            return res.status(200).json({
                message: `User logged in.`,
                login: loginInfo,
                token: token,
            });
        } else {
            return res.status(404).json({
                message: `User not found.`,
            });
        } 
    } catch (err) {
        return res.status(500).json({
            message: 'Could not login user.',
            err: err.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: `User has logged out.`,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Could not log out.',
            error: err.message,
        });
    }
};

module.exports = {
    addRegisteredUser,
    loginUser,
    logoutUser,
};
