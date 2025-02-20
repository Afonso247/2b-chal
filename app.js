require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas de autenticação
app.post('/api/register', userController.register);
app.post('/api/login', userController.login);

// Rotas de livros (protegidas)
app.get('/api/books', auth, bookController.getAllBooks);
app.post('/api/books', auth, bookController.createBook);
app.put('/api/books/:id', auth, bookController.updateBook);
app.delete('/api/books/:id', auth, bookController.deleteBook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});