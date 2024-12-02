import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
})
export default mongoose.model('Comment', commentSchema)