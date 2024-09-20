import { Router } from 'express';
import * as postController from '../controllers/postController';
import { getPostLikesById, likePostById } from '../controllers/postController';

const router = Router();

// Posts
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);

// Likes
router.post('/:id/like', likePostById);
router.get('/:id/likes', getPostLikesById);

export default router;
