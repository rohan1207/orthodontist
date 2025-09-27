import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel.js';
import admin from '../utils/firebaseAdmin.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create account only after Firebase email verification
export const signupVerified = async (req, res) => {
  try {
    const { idToken, name, email, phone, designation, password } = req.body;

    if (!idToken) {
      return res.status(400).json({ status: 'fail', message: 'Missing Firebase ID token.' });
    }

    // Verify Firebase token
    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      return res.status(401).json({ status: 'fail', message: 'Invalid Firebase token.' });
    }

    if (!decoded?.email || !decoded?.email_verified) {
      return res.status(401).json({ status: 'fail', message: 'Email not verified. Please verify your email.' });
    }

    // Ensure the email matches what the client sent (avoid mismatch attacks)
    const verifiedEmail = decoded.email.toLowerCase();
    if (email && email.toLowerCase() !== verifiedEmail) {
      return res.status(400).json({ status: 'fail', message: 'Email mismatch.' });
    }

    // Check existence
    const existing = await User.findOne({ email: verifiedEmail });
    if (existing) {
      return res.status(409).json({ status: 'fail', message: 'User already exists. Please log in.' });
    }

    // Create the user; mark verified; link firebaseUid for future reference
    const newUser = await User.create({
      name,
      email: verifiedEmail,
      phone,
      designation,
      password, // will be hashed by pre-save hook
      firebaseUid: decoded.uid,
      isVerified: true,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Signup failed.', error: error.message });
  }
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, designation, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        status: 'fail',
        message: 'An account with this email already exists. Please log in.' 
      });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      designation,
      password,
    });

    // For now, we log the user in directly. OTP verification will be added next.
    createSendToken(newUser, 201, res);

  } catch (error) {
    res.status(400).json({ 
      status: 'error',
      message: 'Failed to create account.',
      error: error.message 
    });
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { email, name, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Google authentication failed. Email and Google ID are required.',
      });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      // If no user with this googleId, check if an account with this email already exists
      user = await User.findOne({ email });
      if (user) {
        // If email exists but is not linked to a Google account, link it
        user.googleId = googleId;
        await user.save({ validateBeforeSave: false }); // Skip validation as password is not needed
      } else {
        // If no user found, create a new one
        user = await User.create({
          name,
          email,
          googleId,
          isVerified: true, // Email from Google is considered verified
        });
      }
    }

    createSendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'An unexpected error occurred during Google login.',
      error: error.message 
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
     res.status(500).json({ 
      status: 'error',
      message: 'An unexpected error occurred during login.',
      error: error.message 
    });
  }
};

// Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
        status: 'fail',
        message: 'Invalid token. Please log in again.',
      });
  }
};
