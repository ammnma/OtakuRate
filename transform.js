const csv = require('csvtojson');
const fs = require('fs');

async function transformAnime() {

    const data = await csv().fromFile('./dataset/anime.csv');

    const cleaned = data.slice(0, 40).map(anime => {

        // CLEAN GENRES
        let genres = [];

        try {

            genres = anime.genre
                .replace('[', '')
                .replace(']', '')
                .replace(/'/g, '')
                .split(',')
                .map(g => g.trim());

        } catch {

            genres = [];
        }

        // RELEASE YEAR
        let releaseYear = null;

        try {

            releaseYear = anime.aired.match(/\d{4}/)[0];

        } catch {

            releaseYear = null;
        }

        // RANDOM MOODS
        const moodsPool = [
            "feel-good",
            "cry-worthy",
            "hype",
            "dark",
            "comfort-watch",
            "motivational",
            "romantic"
        ];

        const randomMood1 =
            moodsPool[Math.floor(Math.random() * moodsPool.length)];

        const randomMood2 =
            moodsPool[Math.floor(Math.random() * moodsPool.length)];

        return {

            kaggle_uid: Number(anime.uid),

            title: anime.title || "Unknown",

            genre: genres,

            rating: Number(anime.score) || 0,

            episodes: Number(anime.episodes) || 0,

            studio: "Unknown",

            description: anime.synopsis || "No description available.",

            release_year: Number(releaseYear) || 0,

            status: "Finished",

            image: anime.img_url || "",

            mood: [randomMood1, randomMood2],

            vibes: {

                hype: Math.floor(Math.random() * 100),

                emotional_hit: Math.floor(Math.random() * 100),

                rewatch_value: Math.floor(Math.random() * 100)
            }
        };
    });

    fs.writeFileSync(
        './dataset/cleaned_anime.json',
        JSON.stringify(cleaned, null, 2)
    );

    console.log('Anime dataset cleaned!');
}

async function transformReviews() {

    const reviews = await csv().fromFile('./dataset/reviews.csv');

    const cleanedReviews = reviews.slice(0, 150).map(review => {

        return {

            kaggle_anime_uid: Number(review.uid),

            rating: Number(review.score) || 0,

            comment:
                review.text ||
                review.review ||
                "No review provided.",

            flagged: false,

            created_at: new Date()
        };
    });

    fs.writeFileSync(
        './dataset/cleaned_reviews.json',
        JSON.stringify(cleanedReviews, null, 2)
    );

    console.log('Reviews dataset cleaned!');
}

async function runAll() {

    await transformAnime();

    await transformReviews();

    console.log('All datasets transformed successfully!');
}

runAll();