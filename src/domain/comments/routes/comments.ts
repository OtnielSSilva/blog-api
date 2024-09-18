import { Router } from 'express';
import * as commentController from '../controllers/commentController';

const router = Router();

router.post('/:id/comments', commentController.addComment);
router.get('/:id/comments', commentController.getComments);

export default router;
