import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll, getById, getMyPosts } from '../controllers/posts.js';

const router = Router();

// create post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);

// get all posts
// http://localhost:3002/api/posts
router.get('/', getAll);

// get Post By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById);

// get my posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

export default router;