import mongoose, { Schema } from "mongoose";
import { refreshToken } from "../controller/userController";

const userSchema = new Schema({
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

const User = mongoose.model("User", userSchema);
export default User;
