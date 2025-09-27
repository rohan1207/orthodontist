import ExamPrep from '../models/ExamPrep.js';

// @desc    Get all exam preps
// @route   GET /api/exampreps
// @access  Public
export const getAllExamPreps = async (req, res) => {
  try {
    const examPreps = await ExamPrep.find({});
    res.status(200).json({ success: true, count: examPreps.length, data: examPreps });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single exam prep
// @route   GET /api/exampreps/:id
// @access  Public
export const getExamPrepById = async (req, res) => {
  try {
    const examPrep = await ExamPrep.findById(req.params.id);
    if (!examPrep) {
      return res.status(404).json({ success: false, error: 'Exam prep not found' });
    }
    res.status(200).json({ success: true, data: examPrep });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create an exam prep
// @route   POST /api/exampreps
// @access  Private/Admin
export const createExamPrep = async (req, res) => {
  try {
    const examPrep = await ExamPrep.create(req.body);
    res.status(201).json({ success: true, data: examPrep });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update an exam prep
// @route   PUT /api/exampreps/:id
// @access  Private/Admin
export const updateExamPrep = async (req, res) => {
  try {
    const examPrep = await ExamPrep.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!examPrep) {
      return res.status(404).json({ success: false, error: 'Exam prep not found' });
    }
    res.status(200).json({ success: true, data: examPrep });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete an exam prep
// @route   DELETE /api/exampreps/:id
// @access  Private/Admin
export const deleteExamPrep = async (req, res) => {
  try {
    const examPrep = await ExamPrep.findById(req.params.id);
    if (!examPrep) {
      return res.status(404).json({ success: false, error: 'Exam prep not found' });
    }
    await examPrep.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
