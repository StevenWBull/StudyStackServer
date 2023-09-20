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

// Models for each schema
User = mongoose.model('User', userSchema);
Category = mongoose.model('Category', categorySchema);
Stack = mongoose.model('Stack', stackSchema);
Card = mongoose.model('Card', cardSchema);
CardAnswer = mongoose.model('CardAnswer', cardAnswerSchema);

module.exports = {
    User,
    Category,
    Stack,
    Card,
    CardAnswer,
};
