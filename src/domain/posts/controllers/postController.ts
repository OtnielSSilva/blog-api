import { Request, Response } from 'express';
import * as postService from '../services/postService';
import { v4 as uuidv4 } from 'uuid';
import { getPostLikes, likePost } from '../services/postService';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = uuidv4();
  try {
    await postService.createPost(id, title, content);
    res.status(201).json({ id, title, content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export async function likePostById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  await likePost(id);

  const likes = await getPostLikes(id);
  res.json({ likes });
}

export async function getPostLikesById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const likes = await getPostLikes(id);
  res.json({ likes });
}