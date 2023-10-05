require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const logEvents = require('./middleware/logEvents');
const verifyToken = require('./middleware/verifyToken');

const PORT = process.env.PORT || 5050;

connectDB();

// Activate middleware logEvents
app.use(logEvents);

// Activate middleware cors
app.use(cors(corsOptions));

// Built-in middleware for urlencoded data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Routes
app.use('/v1/auth', require('./routes/api/authRoutes'));

// Middleware to verify JWT, routes after this point are protected
app.use(verifyToken);

app.use('/v1', require('./routes/api/userRoutes'));
app.use('/v1', require('./routes/api/categoryRoutes'));
app.use('/v1', require('./routes/api/stackRoutes'));

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
