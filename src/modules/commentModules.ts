import mongoose, { Schema, Document, Model } from "mongoose";

// IComment ensures type safety for the Comment document in TypeScript
interface IComment extends Document
{
    message: string; 
    userId: mongoose.Types.ObjectId; 
    postId: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema(
{
    message: {
        type: String,
        required: true
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

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;

