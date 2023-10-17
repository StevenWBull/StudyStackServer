const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('../model/userSchema');

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
    console.log(!!first_name, !!last_name, !!email, !!pword);
    // Check if all fields are filled
    if (!first_name || !last_name || !email || !pword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = await User.create({
            _id: new mongoose.Types.ObjectId(),
            created_at_date: new Date().toDateString(),
            created_at_time: new Date().toTimeString(),
            updated_at_date: new Date().toDateString(),
            updated_at_time: new Date().toTimeString(),
            first_name,
            last_name,
            email,
            pword,
        });

        const token = _generateJWTToken(newUser);
        return res.status(201).json({
            message: `New user is registered.`,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Could not register user.',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    // Destructure the request body, using optional chaining
    const { email, pword } = req?.body;

    if (!email || !pword) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    try {
        // Find user in database
        const loginInfo = await User.findOne({
            email,
            pword,
        }).exec();

        // If user exists, return user info
        if (loginInfo) {
            const token = _generateJWTToken(loginInfo);
            return res.status(200).json({
                message: `User logged in.`,
                token: token,
            });
        } else {
            // If user doesn't exist or password is incorrect
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Could not login user.', error: error.message });
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
            .json({ message: 'Could not log out.', error: error.message });
    }
};

module.exports = { addRegisteredUser, loginUser, logoutUser };
