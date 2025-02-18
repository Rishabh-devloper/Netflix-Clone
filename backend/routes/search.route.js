import express from 'express';
import { SearchPerson , SearchMovie , SearchTv , getSearchHistory ,RemoveSearchHistoryById } from '../controllers/search.controller.js';
const router = express.Router();

router.get('/person/:query', SearchPerson);
router.get('/movie/:query', SearchMovie);
router.get('/tv/:query', SearchTv);

router.get('/history', getSearchHistory);

router.delete('/history/:id' , RemoveSearchHistoryById );

export default router;