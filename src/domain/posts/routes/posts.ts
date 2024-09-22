import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

// Posts
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);

// Likes
router.post('/:id/like', postController.likePostById);
router.get('/:id/likes', postController.getPostLikesById);

export default router;
