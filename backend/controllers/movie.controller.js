import { fetchFromTMDB } from '../services/tmdb.service.js';

export async function getTrendingMovie(req, res) {
    try {
        const response = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie = response.results[Math.floor(Math.random() * response.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).send('Failed to fetch data from TMDB');
    }
}

export async function getMovieTrailer(req, res) {
    try {
        const movieId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`)

        if (!response) {
            return res.status(404).send('Trailer not found');
        }

        res.json({ success: true, content: response });
    } catch (error) {
        res.status(500).send('Failed to fetch data from TMDB');
    }
}

export async function getMovieDetail(req, res) {
    try {
        const movieId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
        if (!response) {
            return res.status(404).send('Movie not found');
        }
        res.json({ success: true, content: response })

    } catch (error) {
        res.status(500).send({ success: false, message: error.message });

    }
}
export async function getSimilarMovie(req, res) {
    try {
        const movieId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`)
        if (!response) {
            return res.status(404).send('Movie not found');
        }
        res.json({ success: true, content: response })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

export async function getMovieByCategory(req, res) {
    try {
        const category = req.params.category;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        if (!response) {
            return res.status(404).send('Movie not found');
        }
        res.json({ success: true, content: response })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
