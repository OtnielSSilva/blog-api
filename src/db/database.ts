import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { open as openDb } from 'sqlite';

// Função para abrir o banco de dados
export async function openDatabase(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return openDb({
    filename: './blog.db',
    driver: sqlite3.Database,
  });
}

// Função para criar as tabelas se elas ainda não existirem
export async function createTables(): Promise<void> {
  const db = await openDatabase();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      postId TEXT,
      content TEXT,
      FOREIGN KEY(postId) REFERENCES posts(id)
    );
  `);
}
