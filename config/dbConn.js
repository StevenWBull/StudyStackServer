const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        const DB_URI =
            process.env.ENVIRONMENT === 'production'
                ? process.env.DB_URI
                : process.env.TEST_DB_URI;
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
