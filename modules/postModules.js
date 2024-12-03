import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 
})

export default mongoose.model('Post', postSchema)