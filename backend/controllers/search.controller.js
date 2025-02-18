
import User from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';

export async function SearchPerson(req, res) {
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).json({ message: 'Person not found' })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    type: 'person',
                    createdAt: new Date()

                }
            }
        })
        res.status(200).json({ sucess: true, content: response.results });

    } catch (error) {
        return res.status(500).json({ message: error.message })


    }

}
export async function SearchMovie(req, res) {
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).json({ message: 'Movie not found' })
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    type: 'movie',
                    createdAt: new Date()

                }
            }
        })
        res.status(200).json({ sucess: true, content: response.results });

    } catch (error) {
        return res.status(500).json({ message: error.message })


    }

}
export async function SearchTv(req, res) {
    try {
        const query = req.params.query;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).json({ message: 'Tv not found' })
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    type: 'tv',
                    createdAt: new Date()
                }
            }
        })

        res.status(200).json({ sucess: true, content: response.results });

    } catch (error) {
        return res.status(500).json({ message: error.message })


    }

}

export async function getSearchHistory(req, res) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ sucess: true, content: user.searchHistory });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function RemoveSearchHistoryById(req, res) {
    let id = req.params.id;
        id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            }
        })
        res.status(200).json({ sucess: true, message: 'History removed' });

        

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
