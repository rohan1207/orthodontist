import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email address.',
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [function() { return !this.googleId; }, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters long.'],
      select: false, // Do not send password field in query results
    },
    googleId: {
      type: String,
    },
    firebaseUid: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Instance method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
