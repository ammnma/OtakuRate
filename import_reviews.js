const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Review = require('./Model/ReviewModel');

async function importReviews() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const reviewsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'dataset', 'reviews.json'), 'utf8')
        );

        console.log('Found ' + reviewsData.length + ' reviews');

        await Review.deleteMany({});
        console.log('Cleared old reviews');

        if (reviewsData.length > 0) {
            await Review.insertMany(reviewsData);
            console.log('Imported ' + reviewsData.length + ' reviews!');
        }

        const count = await Review.countDocuments();
        console.log('Total reviews in DB: ' + count);

    } catch (err) {
        console.error('Import failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

importReviews();