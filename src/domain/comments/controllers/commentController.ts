import { Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { v4 as uuidv4 } from 'uuid';
import { getCommentLikes, likeComment } from '../services/commentService';

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
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await commentService.getCommentsByPostId(id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export async function likeCommentById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  await likeComment(id);

  const likes = await getCommentLikes(id);
  res.json({ likes });
}

export async function getCommentLikesById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const likes = await getCommentLikes(id);
  res.json({ likes });
}