import { Router } from "express";
import { getPosts, createPost, getPost, updatePost, deletePost, deleteAllPosts } from "../controllers/posts.controllers.js";
const router = Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);
router.delete("/posts", deleteAllPosts);


export default router;
