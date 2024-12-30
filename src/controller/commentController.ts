import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel";


// Create Comment
export const postComment = asyncHandler(async (req: Request , res: Response) => {
    const { message, postId } = req.body;
    const user = req.user!; 

    if (!message || !postId || !user) {
    res.status(400); 
    throw new Error("All fields are required"); 
    }

    const comment = new Comment({
    message,
    userId: user._id, 
    postId,
    });

    await comment.save(); 

    res.status(201).json(comment); 
});


// Get All Comments
export const getAllComments = asyncHandler(async (req: Request, res: Response) => {
  const comments = await Comment.find(); 
  res.status(200).json(comments); 
});


// Get Comment By ID
export const getCommentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; 

  const comment = await Comment.findById(id); 
  if (!comment) {
    res.status(404); 
    throw new Error("Comment not found");
  }

  res.status(200).json(comment); 
});



// Get Comments By User ID
export const getCommentsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params; 

  const comments = await Comment.find({ userId }); 

  if (!comments.length) {
    res.status(404);
    throw new Error("No comments found for this user");
  }

  res.status(200).json(comments); 
});


// Update Comment
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { message } = req.body; 
  
    const comment = await Comment.findById(id); 
  
    if (!comment) {
      res.status(404); 
      throw new Error("Comment not found");
    }
  
    comment.message = message || comment.message;
  
    const updatedComment = await comment.save(); 
  
    res.status(200).json(updatedComment); 
  });
  

// Delete Comment
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params; 
  
    const comment = await Comment.findById(id); 

    if (!comment) {
      res.status(404); 
      throw new Error("Comment not found");
    }
  
    await comment.deleteOne(); 
  
    res.status(200).json({ message: "Comment deleted successfully" }); 
  });