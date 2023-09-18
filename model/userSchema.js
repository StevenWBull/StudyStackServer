const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardAnswerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at_date: {
        type: String,
    },
    created_at_time: {
        type: String,
    },
    is_correct: {
        type: Boolean,
        required: true,
    },
});

const cardSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at_date: {
        type: String,
    },
    created_at_time: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    card_answers: [cardAnswerSchema],
});

const stackSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at_date: {
        type: String,
    },
    created_at_time: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    cards: [cardSchema],
});

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at_date: {
        type: String,
    },
    created_at_time: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    stacks: [stackSchema],
});

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created_at_date: {
        type: String,
    },
    created_at_time: {
        type: String,
    },
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
});

module.exports = mongoose.model('User', userSchema);
