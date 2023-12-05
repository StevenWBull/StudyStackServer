require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const logEvents = require('./middleware/logEvents');
const verifyToken = require('./middleware/verifyToken');

const PORT = process.env.PORT || 8080;

connectDB();

// Activate middleware logEvents
app.use(logEvents);

// Activate middleware cors
app.use(cors(corsOptions));

// Built-in middleware for urlencoded data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Auth Routes
app.use('/v1/auth', require('./routes/api/authRoutes')); // Routes for user to register, login, and logout

// Middleware to verify JWT, routes after this point are protected
app.use(verifyToken);

// Protected Routes
app.use('/v1/user', require('./routes/api/userRoutes'));
app.use('/v1/categories', require('./routes/api/categoryRoutes'));
app.use('/v1/stacks', require('./routes/api/stackRoutes'));
app.use('/v1/cards', require('./routes/api/cardRoutes'));

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
