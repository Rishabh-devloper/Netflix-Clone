import dotenv from 'dotenv';

dotenv.config();
// Importing the required modules


export const ENV_VARS = {
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV
    
};