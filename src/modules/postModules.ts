import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document
 {
    message: string;
    userId: mongoose.Types.ObjectId;
 }

 const postSchema: Schema<IPost> = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 
})

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;