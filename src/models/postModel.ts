import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
