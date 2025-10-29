import mongoose from 'mongoose';

const examPrepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An exam prep must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'An exam prep must have a description'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'A category is required'],
    trim: true,
  },
  downloadUrl: {
    type: String,
    required: [true, 'A download URL is required'],
    trim: true,
  },
  answersNote: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const ExamPrep = mongoose.model('ExamPrep', examPrepSchema);

export default ExamPrep;
