import { openDatabase } from '../../../db/database';

export const getPostById = async (id: string) => {
  const db = await openDatabase();
  return db.get('SELECT * FROM posts WHERE id = ?', id);
};

export const addComment = async (id: string, postId: string, content: string) => {
  const db = await openDatabase();
  await db.run('INSERT INTO comments (id, postId, content) VALUES (?, ?, ?)', [id, postId, content]);
};

export const getCommentsByPostId = async (postId: string) => {
  const db = await openDatabase();
  return db.all('SELECT * FROM comments WHERE postId = ?', postId);
};
