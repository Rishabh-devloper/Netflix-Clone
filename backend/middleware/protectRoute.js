import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req , res , next)=>{
    try {
        const token = req.cookies["token"]
        if(!token){
            return res.status(401).json({message : 'You need to login first'})
        }
        const decoded = jwt.verify(token , ENV_VARS.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message : 'Invalid Token'})
        }
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({message : 'user not found'})
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({message : error.message})
        
    }

}

