// controllers/userController.ts
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel"; // Adjust path if needed
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Register User
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('inside registerUser');
    const { firstName, lastName, email, password } = req.body;
    console.log('inside registerUser');

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
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("user not found or password is incorrect");
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ accessToken });
    console.log("User logged in successfully");
});

// Refresh Token
export const refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401);
        throw new Error("Refresh token required");
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
        res.status(403);
        throw new Error("Invalid or expired refresh token");
    }

    const newAccessToken = generateAccessToken((decoded as jwt.JwtPayload).userId);
    res.status(200).json({ accessToken: newAccessToken });
});

// Logout User
export const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
    console.log("User logged out successfully");
});

