import { Router } from "express";
import * as commentController from "../controllers/commentController";

const router = Router();

// Comments
router.post("/:id/comments", commentController.addComment);
router.get("/:id/comments", commentController.getComments);

// Likes
router.post("/:id/comments/:commentId/like", commentController.likeCommentById);
router.put(
	"/:id/comments/:commentId/dislike",
	commentController.dislikeCommentById
);
router.get(
	"/:id/comments/:commentId/likes",
	commentController.getCommentLikesById
);

export default router;
