import { Request, Response } from "express";
import * as commentService from "../services/commentService";
import { v4 as uuidv4 } from "uuid";

export const addComment = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { content } = req.body;
	const commentId = uuidv4();
	try {
		const post = await commentService.getPostById(id);
		if (post) {
			await commentService.addComment(commentId, id, content);
			res.status(201).json({ commentId, postId: id, content });
		} else {
			res.status(404).json({ error: "Post not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to add comment" });
	}
};

export const getComments = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const comments = await commentService.getCommentsByPostId(id);
		res.json(comments);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch comments" });
	}
};

export const likeCommentById = async (req: Request, res: Response) => {
	const { commentId } = req.params;
	const { userId } = req.body;

	try {
		const comment = await commentService.getCommentsByPostId(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		const userLike = await commentService.getUserLikeOnComment(
			userId,
			commentId
		);
		if (userLike) {
			return res
				.status(400)
				.json({ error: "User has already liked this comment" });
		}

		await commentService.likeComment(userId, commentId);

		const likes = await commentService.getCommentLikes(commentId);
		res.status(200).json({ message: "Liked the comment successfully", likes });
	} catch (error) {
		res.status(500).json({ error: "Failed to like the comment" });
	}
};

export const dislikeCommentById = async (req: Request, res: Response) => {
	const { commentId } = req.params;

	try {
		const comment = await commentService.getCommentsByPostId(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		let likes = await commentService.getCommentLikes(commentId);
		if (!likes)
			return res
				.status(400)
				.json({ error: "Comment doesn't have any likes to remove" });

		await commentService.dislikeComment(commentId);

		const updatedLikes = await commentService.getCommentLikes(commentId);
		res.status(200).json({
			message: "Disliked the comment successfully",
			likes: updatedLikes,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to dislike the comment" });
	}
};

export const getCommentLikesById = async (req: Request, res: Response) => {
	const { commentId } = req.params;

	try {
		const comment = await commentService.getCommentsByPostId(commentId);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}

		const likes = await commentService.getCommentLikes(commentId);
		res.json({ likes });
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch comment likes" });
	}
};
