import { Router } from 'express';
import * as commentController from '../controllers/commentController';

const router = Router();

// Comments
router.post('/:id/comments', commentController.addComment);
router.get('/:id/comments', commentController.getComments);

// Likes
router.post('/:id/like', commentController.likeCommentById);
router.get('/:id/likes', commentController.getCommentLikesById);

export default router;
