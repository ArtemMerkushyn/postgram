import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll } from '../controllers/posts.js';

const router = Router();

// create http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);

// get all posts
// http://localhost:3002/api/posts
router.get('/', getAll);

export default router;