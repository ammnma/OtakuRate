const express = require('express');
const hbs = require('hbs');
const dotenv = require('dotenv');

const routes = require('./Routes/routes');
const db = require('./Model/database');
const Anime = require('./Model/AnimeModel');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('Misc'));

// View engine
app.set('view engine', 'hbs');

// Debug middleware
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    next();
});

// Routes
app.use('/', routes);

async function seedAnimeData() {
    try {
        // Check if anime already exist
        const existingCount = await Anime.countDocuments();
        if (existingCount > 0) {
            console.log(`✅ Anime collection already has ${existingCount} records. Skipping import.`);
            return;
        }

        const filePath = path.join(__dirname, 'dataset', 'top_1000_anime.json');
        const fileContents = await fs.promises.readFile(filePath, 'utf8');
        const animeData = JSON.parse(fileContents);

        if (!Array.isArray(animeData) || animeData.length === 0) {
            console.warn('⚠️ No anime records found in dataset file.');
            return;
        }

        await Anime.insertMany(animeData);
        console.log(`✅ Imported ${animeData.length} anime records.`);
    } catch (err) {
        console.error('❌ Error seeding anime dataset:', err);
        throw err;
    }
}

// ✅ START SERVER ONLY AFTER DB CONNECTS
db.connect()
    .then(async () => {
        await seedAnimeData();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("DB ERROR:", err);
    });