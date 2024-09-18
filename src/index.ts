import express from 'express';
import { createTables } from './db/database';
import postRoutes from './domain/posts/routes/posts';
import commentRoutes from './domain/comments/routes/comments';

const app = express();
const port = 3000;

app.use(express.json());

// Iniciar o banco de dados e criar tabelas
createTables().catch(err => console.error('Error creating tables:', err));

// Rotas
app.use('/posts', postRoutes);
app.use('/posts', commentRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
