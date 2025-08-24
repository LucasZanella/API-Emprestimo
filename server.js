require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para lidar com dados do formulário
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para páginas
app.get('/', (req, res) => {
    res.render('index'); // Página inicial com formulário
});

// Rotas
app.use('/creditos', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});