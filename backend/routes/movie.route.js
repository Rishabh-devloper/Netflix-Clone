import express from 'express';
import { getTrendingMovie , getMovieTrailer , getMovieByCategory , getMovieDetail , getSimilarMovie} from '../controllers/movie.controller.js';


const router = express.Router()

router.get('/trending' , getTrendingMovie)
router.get('/:id/trailer' , getMovieTrailer)
router.get('/:id/details' , getMovieDetail)
router.get('/:id/similar' , getSimilarMovie)
router.get('/:category' , getMovieByCategory)


export default router;