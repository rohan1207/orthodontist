import express from 'express';
import Book from '../models/Book.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all active books (for frontend)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ isActive: true }).sort({ order: 1 });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all books (for admin)
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const books = await Book.find().sort({ order: 1 });
    res.json(books);
  } catch (error) {
    console.error('Error fetching all books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new book (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, author, description, coverImage, ebookLink, buyLink, tags, isActive, order } = req.body;
    
    const newBook = new Book({
      title,
      author,
      description,
      coverImage,
      ebookLink: ebookLink || '',
      buyLink: buyLink || '',
      tags: tags || [],
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
});

// Update book (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, author, description, coverImage, ebookLink, buyLink, tags, isActive, order } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        description,
        coverImage,
        ebookLink: ebookLink || '',
        buyLink: buyLink || '',
        tags: tags || [],
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});

// Delete book (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

// Toggle book active status (admin only)
router.patch('/:id/toggle-active', verifyAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.isActive = !book.isActive;
    await book.save();

    res.json({ 
      message: `Book ${book.isActive ? 'activated' : 'deactivated'} successfully`,
      isActive: book.isActive 
    });
  } catch (error) {
    console.error('Error toggling book status:', error);
    res.status(500).json({ message: 'Error toggling book status', error: error.message });
  }
});

export default router;
