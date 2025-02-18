import express from 'express';
import { getTrendingTv , getTvTrailer , getTvByCategory , getTvDetail , getSimilarTv} from '../controllers/tv.controller.js';
const router = express.Router()
router.get('/trending' , getTrendingTv)
router.get('/:id/trailer' , getTvTrailer)
router.get('/:id/details' , getTvDetail)
router.get('/:id/similar' , getSimilarTv)
router.get('/:category' , getTvByCategory)
export default router;