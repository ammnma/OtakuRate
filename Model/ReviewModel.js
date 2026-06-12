const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    kaggle_anime_uid: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        default: "No review provided."
    },
    flagged: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'reviews' });

module.exports = mongoose.model('Review', ReviewSchema);
