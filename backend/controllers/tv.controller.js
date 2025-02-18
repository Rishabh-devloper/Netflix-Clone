import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const response = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomTv = response.results[Math.floor(Math.random() * response.results?.length)];
        res.json({ sucess: true ,content: randomTv});

        

    } catch (error) {
        res.status(500).send('Failed to fetch data from TMDB');

    }
}
export async function getTvTrailer(req, res) {
    try {
        const tvId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`)
        if (!response) {
            return res.status(404).send('Trailer not found');
        }
        res.json({ success: true, content: response });

    }
    catch (error) {
        res.status(500).send('Failed to fetch data from TMDB');
    }
}
export async function getTvDetail(req, res) {
    try {
        const tvId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`)
        if (!response) {
            return res.status(404).send('Tv not found');
        }
        res.json({ success: true, content: response })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });

    }
}

export async function getSimilarTv(req, res) {
    try {
        const tvId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${tvId}/similar?language=en-US`)
        if (!response) {
            return res.status(404).send('Tv not found');
        }
        res.json({ success: true, content: response })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });

    }
}

export async function getTvByCategory(req, res) {
    try {
        const category = req.params.category;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        if (!response) {
            return res.status(404).send('Tv not found');
        }
        res.json({ success: true, content: response })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });

    }
}



