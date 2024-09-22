import { Request, Response } from "express";
import * as postService from "../services/postService";
import { v4 as uuidv4 } from "uuid";

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await postService.getAllPosts();
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch posts" });
	}
};

export const getPostById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const post = await postService.getPostById(id);
		if (post) {
			res.json(post);
		} else {
			res.status(404).json({ error: "Post not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch post" });
	}
};

export const createPost = async (req: Request, res: Response) => {
	const { title, content } = req.body;
	const id = uuidv4();
	try {
		await postService.createPost(id, title, content);
		res.status(201).json({ id, title, content });
	} catch (error) {
		res.status(500).json({ error: "Failed to create post" });
	}
};

export const likePostById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { userId } = req.body;

	try {
		const post = await postService.getPostById(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLike = await postService.getUserLikeOnPost(userId, id);
		if (userLike) {
			return res
				.status(400)
				.json({ error: "User has already liked this post" });
		}

		await postService.likePost(userId, id);

		const likes = await postService.getPostLikes(id);
		res.status(200).json({ message: "Liked the post successfully", likes });
	} catch (error) {
		res.status(500).json({ error: "Failed to like this post" });
	}
};

export const dislikePostById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await postService.getPostById(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const likes = await postService.getPostLikes(id);
		if (!likes) {
			return res
				.status(400)
				.json({ error: "Post doesn't have any likes to remove" });
		}

		await postService.dislikePost(id);

		const updatedLikes = await postService.getPostLikes(id);
		res
			.status(200)
			.json({ message: "Disliked the post successfully", likes: updatedLikes });
	} catch (error) {
		res.status(500).json({ error: "Failed to dislike this post" });
	}
};

export const getPostLikesById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await postService.getPostById(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const likes = await postService.getPostLikes(id);
		res.json({ likes });
	} catch (error) {
		res.status(500).json({ error: "Failed to get likes" });
	}
};
