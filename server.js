require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Conectar ao banco
connectDB();

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Usuários com Express e Mongoose está funcionando!');
});

// Rotas de usuários
app.use('/creditos', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});