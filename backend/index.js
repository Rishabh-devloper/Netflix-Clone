import express from 'express';
import AuthRoute from './routes/auth.route.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';
const app = express();
app.use(express.json())
app.use('/api/auth' , AuthRoute)




app.listen(ENV_VARS.PORT , ()=>{
    console.log('server is running on port ' , ENV_VARS.PORT)
    connectDB();
})