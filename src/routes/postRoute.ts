import express from "express";
import { createPost,getAllPosts,getPostById,getPostByUserId,updatePost} from "../controller/postController";
import { auth } from "../controller/userController";

const router = express.Router();
router.post("/create",auth, createPost);
router.get("/all",auth, getAllPosts);
router.get("/:id",auth, getPostById);
//need to check
router.get("/user",auth, getPostByUserId);
router.put("/:id",auth, updatePost);


export default router;