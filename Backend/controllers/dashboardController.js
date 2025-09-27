import Blog from '../models/Blog.js';
import Book from '../models/Book.js';
import ExamPrep from '../models/ExamPrep.js';
import User from '../models/userModel.js';

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const bookCount = await Book.countDocuments();
    const examPrepCount = await ExamPrep.countDocuments();
    const userCount = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        blogs: blogCount,
        books: bookCount,
        examPreps: examPrepCount,
        users: userCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
