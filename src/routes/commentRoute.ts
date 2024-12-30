import express from "express";
import {
  postComment,
  getAllComments,
  getCommentById,
  getCommentsByUserId,
  updateComment,
  deleteComment,
} from "../controller/commentController";
import { auth } from "../controller/userController";

const router = express.Router();

router.post("/create", auth, postComment);

router.get("/all", auth, getAllComments);

router.get("/:id", auth, getCommentById);

router.get("/user/:userId", auth, getCommentsByUserId);

router.put("/:id", auth, updateComment);

router.delete("/:id", auth, deleteComment);

export default router;