import express from "express";
import { createPost,getAllPosts,getPostById,updatePost, deletePost} from "../controller/postController";
import { auth } from "../controller/userController";

const router = express.Router();

router.post("/create",auth, createPost);
router.get("/all",auth, getAllPosts);
router.get("/:id",auth, getPostById);
router.put("/:id",auth, updatePost);
router.delete("/:id",auth, deletePost);

export default router;