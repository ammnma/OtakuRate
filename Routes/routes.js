const express = require('express');
const router = express.Router();

const Anime = require('../Model/AnimeModel');
const Review = require('../Model/ReviewModel');

// HOME
router.get('/', async (req, res) => {
    try {
        const animeData = await Anime.find().lean();
        res.render('home', { animeData });
    } catch (err) {
        console.log(err);
        res.send("Error loading homepage");
    }
});

// SEARCH
router.get('/search', async (req, res) => {
    const searchQuery = req.query.search;

    try {
        const animeData = await Anime.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).lean();

        res.render('search', { animeData, searchQuery });
    } catch (err) {
        console.log(err);
        res.send("Error in search");
    }
});

// ANIME PAGE (uses _id in URL, but queries reviews by kaggle_uid)
router.get('/anime/:id', async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).lean();

        if (!anime) return res.send("Anime not found");

        // ✅ Query reviews by kaggle_uid (NOT by _id)
        const reviews = await Review.find({
            kaggle_anime_uid: anime.kaggle_uid
        }).lean();

        console.log(`Found ${reviews.length} reviews for ${anime.title} (kaggle_uid: ${anime.kaggle_uid})`);

        res.render('anime', { anime, reviews });

    } catch (err) {
        console.log(err);
        res.send("Error loading anime");
    }
});

// REVIEW PAGE (FORM PAGE)
router.get('/review/:id', async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).lean();

        if (!anime) return res.send("Anime not found");

        res.render('review', { anime });

    } catch (err) {
        console.log(err);
        res.send("Error loading review page");
    }
});

// POST REVIEW (saves with kaggle_uid)
router.post('/review/:id', async (req, res) => {
    try {
        // Get the anime to find its kaggle_uid
        const anime = await Anime.findById(req.params.id).lean();

        if (!anime) return res.send("Anime not found");

        // ✅ Save review with kaggle_uid (NOT _id)
        await Review.create({
            kaggle_anime_uid: anime.kaggle_uid,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            flagged: false,
            created_at: new Date()
        });

        console.log(`Review saved for ${anime.title} (kaggle_uid: ${anime.kaggle_uid})`);

        // redirect back to anime page
        res.redirect('/anime/' + req.params.id);

    } catch (err) {
        console.log("ERROR saving review:", err);
        res.send("Error saving review");
    }
});

// DEBUG ROUTE - see all reviews
router.get('/debug-reviews', async (req, res) => {
    try {
        const allReviews = await Review.find({}).lean();
        res.json({
            count: allReviews.length,
            reviews: allReviews
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;