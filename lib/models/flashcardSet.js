const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Flashcard'
        }
    ]
});

module.exports = mongoose.model('FlashcardSet', schema);
