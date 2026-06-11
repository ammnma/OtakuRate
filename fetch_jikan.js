const fs = require('fs');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchTopAnime(targetCount = 1000) {
    const baseUrl = "https://api.jikan.moe/v4/top/anime";
    const animeList = [];
    let page = 1;

    console.log(`🚀 Fetching the top ${targetCount} anime from MyAnimeList...`);

    while (animeList.length < targetCount) {
        try {
            console.log(`Fetching page ${page}...`);
            const response = await fetch(`${baseUrl}?page=${page}`);

            if (response.status === 429) {
                console.log("⚠️ Rate limited! Waiting 5 seconds before retrying...");
                await delay(5000);
                continue; 
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                console.log("No more anime found on the API.");
                break;
            }

            for (const anime of data.data) {
                if (animeList.length >= targetCount) break;

                animeList.push({
                    id: anime.mal_id,
                    title: anime.title,
                    genres: anime.genres ? anime.genres.map(g => g.name) : [],
                    image_url: anime.images?.jpg?.image_url || null,
                    rating: anime.score || 0,
                    episodes: anime.episodes || 0,
                    studio: anime.studios && anime.studios.length > 0 ? anime.studios[0].name : "Unknown",
                    status: anime.status || "Unknown",
                    description: anime.synopsis || "No description available.",
                    release_year: anime.year || null
                });
            }

            const hasNextPage = data.pagination?.has_next_page;
            if (!hasNextPage) {
                console.log("Reached the final page of API results.");
                break;
            }

            page++;
            await delay(1000); 

        } catch (error) {
            console.error(`❌ An error occurred: ${error.message}`);
            console.log("Retrying in 5 seconds...");
            await delay(5000);
        }
    }
    return animeList;
}

async function run() {
    const data = await fetchTopAnime(1000);
    fs.writeFileSync('./dataset/top_1000_anime.json', JSON.stringify(data, null, 4), 'utf-8');
    console.log(`✅ Successfully saved ${data.length} anime to './dataset/top_1000_anime.json'`);
}

run();