import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import logoutRoute from './routes/logoutRouter.js'; 
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usando as rotas de usuários
app.use('/api/users', userRoutes);
app.use('/api/users', logoutRoute);

app.get('/', (req, res) => {
  res.send('Hello World! Teste de rota');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
