const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ usuario: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      usuario: req.user._id
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, usuario: req.user._id });
    
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ 
      _id: req.params.id, 
      usuario: req.user._id 
    });

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    res.json({ message: 'Livro removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
};