import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createPost, getAll, getById, getMyPosts, getPostComments, getUserPosts, removePost, updatePost } from '../controllers/posts.js';

const router = Router();

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost);

// Get All Posts
// http://localhost:3002/api/posts
router.get('/', getAll);

// Get Post By Id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById);

// Update Post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost);

// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

// Get User Posts
// http://localhost:3002/api/posts/:idUser/posts
router.get('/:idUser/posts', getUserPosts);

// Remove Post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, removePost);

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments);

export default router;