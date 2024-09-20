import { Router } from 'express';
import * as commentController from '../controllers/commentController';
import { getCommentLikesById, likeCommentById } from '../controllers/commentController';

const router = Router();

// Comments
router.post('/:id/comments', commentController.addComment);
router.get('/:id/comments', commentController.getComments);

// Likes
router.post('/:id/like', likeCommentById);
router.get('/:id/likes', getCommentLikesById);

export default router;
