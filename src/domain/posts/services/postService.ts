import { openDatabase } from '../../../db/database';

export const getAllPosts = async () => {
  const db = await openDatabase();
  return db.all('SELECT * FROM posts');
};

export const getPostById = async (id: string) => {
  const db = await openDatabase();
  return db.get('SELECT * FROM posts WHERE id = ?', id);
};

export const createPost = async (id: string, title: string, content: string) => {
  const db = await openDatabase();
  await db.run('INSERT INTO posts (id, title, content) VALUES (?, ?, ?)', [id, title, content]);
};
