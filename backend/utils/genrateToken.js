import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

dotenv.config();
const secret = ENV_VARS.SECRET_KEY;

export const genrateToken =(id , res)=>{
   const token = jwt.sign({id} , secret , {expiresIn : '15d'})
    res.cookie('token' , token , {
        expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly : true ,
        secure : ENV_VARS.NODE_ENV === 'developement' ? true : false,
        sameSite:'strict'

    })
    return token;


}
