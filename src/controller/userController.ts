import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import errorHandler from "../middleWare/errorHandler";  
import User from "../models/userModel"; 
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {generateAccessToken,generateRefreshToken,verifyRefreshToken} from "../middleWare/jwtMiddle"; // Adjust path if needed
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;




// Register User
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ user });
    console.log("User created successfully");
});

// Login User
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("User not found or password is incorrect");
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    if(user.refreshToken == null){
        user.refreshToken = [];
    }
    user.refreshToken.push(refreshToken);
    await user.save();

    res.status(200).json({email: user.email, id:user._id, accessToken, refreshToken });
    console.log("User logged in successfully");
});

// Refresh Token
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        res.status(400);
        throw new Error("Refresh token required");
    }

    const user = await User.findOne({ refreshToken: token });
    if (!user) {
        res.status(403);
        throw new Error("Invalid refresh token");
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err :any, data :any) => {
        if (err) {
            res.status(403);
            throw new Error("Expired or invalid refresh token");
        }

    if(!user.refreshToken || !user.refreshToken.includes(token)){
        res.status(403);
        user.refreshToken = [];
        await user.save();
        throw new Error("Invalid refresh token");
    }

        const payload = data as { userId: string };
        if (payload.userId !== user._id.toString()) {
            res.status(403);
            throw new Error("Token does not match user ID");
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user._id.toString());
        const newRefreshToken = generateRefreshToken(user._id.toString());

        // Update user's refresh token array
        user.refreshToken = user.refreshToken.filter((t) => t !== token); // Remove old token
        user.refreshToken.push(newRefreshToken);
        await user.save();

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
});

// Logout User
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        res.status(400);
        throw new Error("Refresh token required");
    }

    // Verify the refresh token and extract the user ID
    let userId: string;
    try {
        const payload = verifyRefreshToken(token);
        if (!payload) {
            res.status(403);
            throw new Error("Invalid or expired refresh token");
        }
        userId = payload.userId;
    } catch (err) {
        res.status(403);
        throw new Error("Invalid or expired refresh token");
    }

    // Find the user using the extracted ID
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Check if the provided token exists in the user's refresh token list
    if (!user.refreshToken.includes(token)) {
        res.status(403);
        throw new Error("Refresh token is not valid for this user");
    }

    // Remove the token from the refresh token list
    user.refreshToken = user.refreshToken.filter((t) => t !== token);
    await user.save();

    res.status(200).json({ message: "User logged out successfully" });
    console.log("User logged out successfully");
});




// Auth Middleware
export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Access token required");
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.status(403);
            throw new Error("Invalid or expired access token");
        }

        const payload = data as { userId: string };
        req.query.userid = payload.userId;
        console.log("User authenticated successfully: ", payload.userId);
        next();
    });
});
