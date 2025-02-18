import express from 'express';
import AuthRoute from './routes/auth.route.js';
import MovieRoute from './routes/movie.route.js';
import SearchRoute from './routes/search.route.js';
import TvRoute from './routes/tv.route.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', AuthRoute)
app.use('/api/movie', protectRoute, MovieRoute)
app.use('/api/tv', protectRoute, TvRoute)
app.use('/api/search', protectRoute, SearchRoute)




app.listen(ENV_VARS.PORT, () => {
  console.log('server is running on port ', ENV_VARS.PORT)
  connectDB();
})





