import Blog from '../models/Blog.js';
import Book from '../models/Book.js';
import ExamPrep from '../models/ExamPrep.js';
import TopicSummary from '../models/TopicSummary.js';
import User from '../models/userModel.js';

// @desc    Get total count of users
// @route   GET /api/users/count
// @access  Private/Admin
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user count',
      error: error.message
    });
  }
};

// @desc    Get total count of blogs
// @route   GET /api/blogs/count
// @access  Private/Admin
export const getBlogCount = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog count',
      error: error.message
    });
  }
};

// @desc    Get total count of exam preparations
// @route   GET /api/exam-preparations/count
// @access  Private/Admin
export const getExamPrepCount = async (req, res) => {
  try {
    const count = await ExamPrep.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exam preparations count',
      error: error.message
    });
  }
};

// @desc    Get total count of topic summaries
// @route   GET /api/topic-summaries/count
// @access  Private/Admin
export const getTopicSummaryCount = async (req, res) => {
  try {
    const count = await TopicSummary.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topic summaries count',
      error: error.message
    });
  }
};

// @desc    Get total count of recommended books
// @route   GET /api/recommended-books/count
// @access  Private/Admin
export const getBookCount = async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommended books count',
      error: error.message
    });
  }
};

// @desc    Get all dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const [users, blogs, examPreps, topicSummaries, books] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      ExamPrep.countDocuments(),
      TopicSummary.countDocuments(),
      Book.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        blogs,
        examPreps,
        topicSummaries,
        books
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching dashboard statistics',
      error: error.message 
    });
  }
};
