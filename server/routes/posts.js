import express from "express";
import { createPost, getFeedPosts } from "../controllers/post.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getFeedPosts);
router.post('/', verifyToken, createPost);

export default router;