// utils/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;


export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err) {
        return null; // Invalid or expired token
    }
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (err) {
        return null; // Invalid or expired token
    }
};



