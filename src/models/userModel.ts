import mongoose, { Schema, Document } from "mongoose";
import { refreshToken } from "../controller/userController";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string[];
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken:{
        type: [String],
        default: [],
    }
});

export default mongoose.model<IUser>("User", userSchema);


export interface UserDocument extends IUser, Document {}
