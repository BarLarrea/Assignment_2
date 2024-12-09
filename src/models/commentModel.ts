import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
