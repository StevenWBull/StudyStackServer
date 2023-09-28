const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// _id is added automatically by mongoose to each schema

const cardAnswerSchema = new Schema({
    is_correct: {
        type: Boolean,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const cardSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    answer: {
        type: cardAnswerSchema,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const stackSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    cards: [cardSchema],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    stacks: [stackSchema],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pword: {
        type: String,
        required: true,
    },
    categories: [categorySchema],
    created_at: {
        type: Date,
        default: Date.now,
    },
});

User = mongoose.model('User', userSchema);
module.exports = {
    User,
};
