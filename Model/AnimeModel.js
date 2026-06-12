const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    kaggle_uid: Number,  // ← Make sure this exists
    title: String,
    genre: [String],
    rating: Number,
    episodes: Number,
    studio: String,
    description: String,
    release_year: Number,
    status: String,
    image: String,
    mood: [String],
    vibes: Object
});

// 🔥 THIS LINE IS CRITICAL
module.exports = mongoose.model('Anime', animeSchema, 'animes');