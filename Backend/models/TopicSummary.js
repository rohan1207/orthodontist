import mongoose from 'mongoose';

const topicSummarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: true,
        trim: true
    },
    // Generic file URL (PDF or DOCX)
    fileUrl: {
        type: String,
    },
    // Original pdfUrl kept for backward compatibility (older records)
    pdfUrl: {
        type: String,
    },
    // MIME type, e.g., 'application/pdf' or DOCX mimetype
    fileType: {
        type: String,
    },
    cloudinaryId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const TopicSummary = mongoose.model('TopicSummary', topicSummarySchema);

export default TopicSummary;
