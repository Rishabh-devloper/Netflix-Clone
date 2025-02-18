import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { genrateToken } from '../utils/genrateToken.js';
export async function logout(req, res) {
    // logout logic
    try {
        res.clearCookie("token");
        return res.status(200).json({ sucess: true ,message: "Logged out successfully" });
        
    } catch (error) {
        console.log("error in logout controller", error);
        return res.status(500).json({ sucess: false , message: "Something went wrong" });
        
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ sucess: false , message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ sucess: false , message: "Invalid email" });
        }
        const passwordCorrect = await bcryptjs.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(400).json({ sucess: false , message: "Invalid Password" });
        }
        genrateToken(existingUser._id, res);
        return res.status(200).json({ sucess: true ,message: "Logged in successfully" });

        
    } catch (error) {
        console.log("error in login controller", error);
        return res.status(500).json({ sucess: false ,message: "Something went wrong" });
        
    }
}

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const existingUserByName = await User.findOne({ name: name });
        if (existingUserByName) {
            return res.status(400).json({ message: "User with this name already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICTURE = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICTURE[Math.floor(Math.random() * PROFILE_PICTURE.length)];

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image
        });

        genrateToken(newUser._id, res);
        const savedUser = await newUser.save();
        res.status(200).json({ message: "User created successfully", savedUser });



    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
