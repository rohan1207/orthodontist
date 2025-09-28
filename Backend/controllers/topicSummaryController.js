import TopicSummary from '../models/TopicSummary.js';
import { cloudinary } from '../config/cloudinary.js';
import streamifier from 'streamifier';
import https from 'https';
import { URL } from 'url';

// Utility to upload a stream to Cloudinary
const uploadToCloudinary = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

// Stream file with Range support via backend to avoid CORS/401 issues
export const streamTopicFile = async (req, res) => {
    try {
        const summary = await TopicSummary.findById(req.params.id);
        if (!summary) return res.status(404).json({ message: 'Topic summary not found.' });

        let ext = 'pdf';
        let contentType = 'application/pdf';
        if (summary.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || (summary.fileUrl || summary.pdfUrl || '').toLowerCase().endsWith('.docx')) {
            ext = 'docx';
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        }

        const expiresAt = Math.floor(Date.now() / 1000) + 60 * 30; // 30 min
        const signedUrl = cloudinary.utils.private_download_url(summary.cloudinaryId, ext, {
            resource_type: 'raw',
            type: 'authenticated',
            expires_at: expiresAt,
        });

        // Follow redirects and stream to client
        const doRequest = (urlStr) => new Promise((resolve, reject) => {
            const parsed = new URL(urlStr);
            const options = {
                method: 'GET',
                headers: {}
            };
            // Forward Range header if present
            if (req.headers.range) {
                options.headers['Range'] = req.headers.range;
            }
            const reqHttps = https.request(parsed, options, (r) => {
                // Handle redirects
                if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
                    r.resume();
                    resolve(doRequest(r.headers.location));
                    return;
                }
                resolve(r);
            });
            reqHttps.on('error', reject);
            reqHttps.end();
        });

        const upstream = await doRequest(signedUrl);

        // Propagate headers
        const status = upstream.statusCode || 200;
        const headers = {
            'Content-Type': contentType,
        };
        if (upstream.headers['content-length']) headers['Content-Length'] = upstream.headers['content-length'];
        if (upstream.headers['content-range']) headers['Content-Range'] = upstream.headers['content-range'];
        if (upstream.headers['accept-ranges']) headers['Accept-Ranges'] = upstream.headers['accept-ranges'];

        res.writeHead(status, headers);
        upstream.pipe(res);
    } catch (error) {
        console.error('Error streaming topic file:', error);
        const status = error.http_code || 500;
        const message = error.message || 'Failed to stream file';
        res.status(status).json({ message });
    }
};

// Return a temporary signed URL for the stored file (works even if delivery requires auth)
export const getSignedFileUrl = async (req, res) => {
    try {
        const summary = await TopicSummary.findById(req.params.id);
        if (!summary) return res.status(404).json({ message: 'Topic summary not found.' });

        // Decide extension from stored fileType or cloudinaryId hint
        let ext = 'pdf';
        if (summary.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || (summary.fileUrl || summary.pdfUrl || '').toLowerCase().endsWith('.docx')) {
            ext = 'docx';
        }

        const expiresAt = Math.floor(Date.now() / 1000) + 60 * 30; // 30 minutes
        const url = cloudinary.utils.private_download_url(summary.cloudinaryId, ext, {
            resource_type: 'raw',
            type: 'authenticated',
            expires_at: expiresAt,
        });

        return res.json({ url, fileType: summary.fileType || (ext === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') });
    } catch (error) {
        console.error('Error generating signed file URL:', error);
        const status = error.http_code || 500;
        const message = error.message || 'Failed to generate signed URL';
        return res.status(status).json({ message });
    }
};

export const createTopicSummary = async (req, res) => {
    const { title, description, tags } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'PDF file is required.' });
    }
    // Validate mimetype: allow PDF and DOCX
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: 'Only PDF or DOCX files are allowed.' });
    }

    try {
        // Determine extension for delivery URL (helps Office viewer recognize DOCX/PDF)
        const ext = file.mimetype === 'application/pdf' ? 'pdf'
            : file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? 'docx'
            : undefined;

        // Upload to Cloudinary (raw resource for documents)
        const result = await uploadToCloudinary(file.buffer, {
            folder: 'topic_summaries',
            resource_type: 'raw',
            format: ext, // ensures the returned secure_url ends with .pdf or .docx
            type: 'authenticated',
            use_filename: true,
            unique_filename: true
        });

        const fileUrl = result.secure_url;
        const fileType = file.mimetype;
        const doc = new TopicSummary({
            title,
            description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            fileUrl,
            fileType,
            // For backward compatibility, still set pdfUrl when file is PDF
            pdfUrl: fileType === 'application/pdf' ? fileUrl : undefined,
            cloudinaryId: result.public_id
        });

        await doc.save();

        res.status(201).json(doc);
    } catch (error) {
        console.error('Error creating topic summary:', error);
        // Surface more useful error details if available
        const status = error.http_code || 500;
        const message = error.message || 'Server error while creating topic summary.';
        res.status(status).json({ message });
    }
};

export const getTopicSummaryById = async (req, res) => {
    try {
        const summary = await TopicSummary.findById(req.params.id);
        if (!summary) {
            return res.status(404).json({ message: 'Topic summary not found.' });
        }
        res.status(200).json(summary);
    } catch (error) {
        console.error('Error fetching topic summary by ID:', error);
        res.status(500).json({ message: 'Server error while fetching topic summary.' });
    }
};

export const getTopicSummaries = async (req, res) => {
    try {
        const summaries = await TopicSummary.find().sort({ createdAt: -1 });
        res.status(200).json(summaries);
    } catch (error) {
        console.error('Error fetching topic summaries:', error);
        res.status(500).json({ message: 'Server error while fetching topic summaries.' });
    }
};
