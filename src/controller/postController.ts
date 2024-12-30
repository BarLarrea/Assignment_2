import Post from "../models/postModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// Create Post
export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const {message} = req.body;
    const user = req.user!;
    if (!message) {
        res.status(400);
        throw new Error("Invalid post data");
    }
    const post = new Post({
        message,
        userId: user._id,
    });
    await post.save();
    res.status(201).json(post);

});

// Get All Posts
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await Post.find({});
    res.status(200).json(posts);
});

// Get Post By Id
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    res.status(200).json(post);
});

// Get Posts By userId
export const getPostByUserId = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    console.log(user);
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
});

// Update Post
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    const { message } = req.body;
    if (!message) {
        res.status(400);
        throw new Error("Invalid post data");
    }
    post.message = message;
    await post.save();
    res.status(200).json(post);
});


// Delete Post
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post removed" });
});