import Blog from '../models/Blog.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

/**
 * Handles image uploads by taking a file from the request, passing it to the
 * Cloudinary upload utility (which handles compression), and returning the secure URL.
 */
export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    const imageUrl = await uploadBufferToCloudinary(req.file, 'blogs');
    console.log('Upload successful:', imageUrl);
    res.json({ url: imageUrl });
  } catch (err) {
    console.error('--- CLOUDINARY UPLOAD ERROR ---', err);
    res.status(500).json({
      error: 'Image upload failed.',
      details: err.message,
    });
  }
}

// Function to extract image URLs from EditorJS content
function extractImageUrlsFromContent(content) {
  const imageUrls = [];
  if (!content) return imageUrls;

  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    if (parsedContent.blocks && Array.isArray(parsedContent.blocks)) {
      parsedContent.blocks.forEach(block => {
        if (block.type === 'image' && block.data && block.data.file && block.data.file.url) {
          imageUrls.push(block.data.file.url);
        }
      });
    }
  } catch (err) {
    console.warn('Error parsing content for image URLs:', err);
  }

  return imageUrls;
}

export async function createBlog(req, res) {
  try {
    const payload = req.body;
    
    console.log('Creating blog with payload:', {
      mainHeading: payload.mainHeading,
      slug: payload.slug,
      author: payload.author,
      heroImage: payload.heroImage ? 'Present' : 'None',
      contentLength: payload.content ? payload.content.length : 0,
      tags: payload.tags,
      category: payload.category
    });

    // Validate required fields
    if (!payload.mainHeading) {
      return res.status(400).json({ error: 'Main heading is required' });
    }
    
    if (!payload.slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: payload.slug });
    if (existingBlog) {
      return res.status(400).json({ error: 'A blog with this slug already exists' });
    }

    // Ensure heroImage is a URL if provided
    if (payload.heroImage && !/^https?:\/\//.test(payload.heroImage)) {
      return res.status(400).json({ error: 'Hero image must be a valid URL' });
    }

    // Extract image URLs from content for metadata
    const contentImageUrls = extractImageUrlsFromContent(payload.content);
    
    // Create image metadata
    const imageMetadata = {
      heroImageUrl: payload.heroImage || null,
      contentImageUrls: contentImageUrls,
      totalImages: (payload.heroImage ? 1 : 0) + contentImageUrls.length
    };

    // Ensure arrays are properly formatted
    if (payload.gallery && !Array.isArray(payload.gallery)) {
      payload.gallery = [];
    }
    
    if (payload.tags && !Array.isArray(payload.tags)) {
      payload.tags = [];
    }
    
    if (payload.keywords && !Array.isArray(payload.keywords)) {
      payload.keywords = [];
    }

    if (payload.summaryPoints && !Array.isArray(payload.summaryPoints)) {
      payload.summaryPoints = [];
    }

    if (payload.citations && !Array.isArray(payload.citations)) {
      payload.citations = [];
    }

    // Add image metadata to payload
    payload.imageMetadata = imageMetadata;

    // Create the blog
    const blog = new Blog(payload);
    await blog.save();

    console.log('Blog created successfully:', blog._id, blog.slug);
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: {
        _id: blog._id,
        mainHeading: blog.mainHeading,
        slug: blog.slug,
        status: blog.status,
        createdAt: blog.createdAt,
        imageMetadata: blog.imageMetadata
      }
    });
    
  } catch (err) {
    console.error('Error creating blog:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      return res.status(400).json({ error: 'Validation error', details: errors });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Blog with this slug already exists' });
    }
    
    res.status(500).json({ error: 'Could not create blog', details: err.message });
  }
}

export async function listBlogs(req, res) {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'published',
      category,
      tag,
      author,
      search
    } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    if (tag) {
      query.tags = { $in: [new RegExp(tag, 'i')] };
    }
    
    if (author) {
      query.author = new RegExp(author, 'i');
    }
    
    if (search) {
      query.$or = [
        { mainHeading: new RegExp(search, 'i') },
        { subHeading: new RegExp(search, 'i') },
        { shortDescription: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const blogs = await Blog.find(query)
      .select('mainHeading subHeading slug heroImage shortDescription tags category author createdAt readingTime views likes imageMetadata')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalBlogs: total,
        hasNext: skip + Number(limit) < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (err) {
    console.error('Error listing blogs:', err);
    res.status(500).json({ error: 'Could not fetch blogs' });
  }
}

export async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const blog = await Blog.findOne({ slug });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Increment views
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    blog.views += 1;

    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ error: 'Could not fetch blog' });
  }
}

// Additional controller functions for admin
export async function updateBlog(req, res) {
  try {
    const { slug } = req.params;
    const updates = req.body;
    
    // Re-extract image metadata if content was updated
    if (updates.content) {
      const contentImageUrls = extractImageUrlsFromContent(updates.content);
      updates.imageMetadata = {
        heroImageUrl: updates.heroImage || null,
        contentImageUrls: contentImageUrls,
        totalImages: (updates.heroImage ? 1 : 0) + contentImageUrls.length
      };
    }

    const blog = await Blog.findOneAndUpdate({ slug }, updates, { new: true });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ error: 'Could not update blog' });
  }
}

export async function deleteBlog(req, res) {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOneAndDelete({ slug });
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Could not delete blog' });
  }
}