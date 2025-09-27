import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { buildApiUrl } from '../utils/api';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, reload } from 'firebase/auth';
import {
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const SubscriptionGate = ({ onAuthSuccess }) => {
  const { login } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
    const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // If a user has been sent a verification email, start checking their verification status.
    if (verificationSent && auth.currentUser) {
      const interval = setInterval(async () => {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          // Automatically trigger the final sign-up step once verified.
          Swal.fire({
            icon: 'success',
            title: 'Email Verified!',
            text: 'Your email has been successfully verified. Completing your registration...',
            timer: 2000,
            showConfirmButton: false,
          });
          handleCompleteSignup();
        }
      }, 3000); // Check every 3 seconds

      // Cleanup interval on component unmount or if the user logs out.
      return () => clearInterval(interval);
    }
  }, [verificationSent, auth.currentUser]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(buildApiUrl('/api/users/login'), { email, password });
      login(res.data.data.user, res.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'Welcome back!',
        timer: 1500,
        showConfirmButton: false,
      });
      onAuthSuccess?.();
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      Swal.fire({ icon: 'error', title: 'No session', text: 'Please sign up again.' });
      return;
    }
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser);
      Swal.fire({ icon: 'info', title: 'Verification email resent', text: 'Please check your inbox and spam folder.' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Could not resend', text: err.message || 'Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please check your passwords and try again.',
      });
      return;
    }
    setLoading(true);
    try {
      // 1) Create Firebase user (email/password)
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // 2) Send verification email
      await sendEmailVerification(cred.user);
      setVerificationSent(true);
      Swal.fire({
        icon: 'info',
        title: 'Verify your email',
        text: 'We have sent a verification link to your email. Please verify, then click "I\'ve verified" below to continue.',
      });
    } catch (err) {
      const message = err?.code?.startsWith('auth/') ? err.message : (err.response?.data?.message || 'Signup failed. Please try again.');
      Swal.fire({ icon: 'error', title: 'Signup error', text: message });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    // Called after user says they verified email
    setVerifying(true);
    try {
      if (!auth.currentUser) {
        Swal.fire({ icon: 'error', title: 'No session', text: 'Please sign up again.' });
        return;
      }
      // Reload to ensure latest verification status
      await reload(auth.currentUser);
      if (!auth.currentUser.emailVerified) {
        Swal.fire({ icon: 'warning', title: 'Email not verified yet', text: 'Please click the verification link in your email, then try again.' });
        return;
      }
      // Get ID token to prove verification to backend
      const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
      const res = await axios.post(buildApiUrl('/api/users/signup-verified'), {
        idToken,
        name,
        email,
        phone,
        designation,
        password,
      });
      login(res.data.data.user, res.data.token);
      Swal.fire({ icon: 'success', title: 'Welcome!', text: 'Your email is verified and account is created.' });
      onAuthSuccess?.();
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Verification failed.';
      Swal.fire({ icon: 'error', title: 'Could not complete signup', text: message });
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else {
      if (verificationSent) {
        // Resend verification email instead of re-creating account
        handleResendVerification();
      } else {
        handleSignup();
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      
      const res = await axios.post(buildApiUrl('/api/users/google-login'), {
        email: user.email,
        name: user.displayName,
        googleId: user.uid,
      });

      login(res.data.data.user, res.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Signed In!',
        text: `Welcome, ${user.displayName}!`,
        timer: 1500,
        showConfirmButton: false,
      });
      onAuthSuccess?.();

    } catch (error) {
      const message = error.response?.data?.message || 'Google Sign-In failed. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.28 }}
      className="w-full max-w-xl"
    >
      <div className="bg-white/75 backdrop-blur-2xl rounded-2xl border border-white/60 shadow-2xl p-6 sm:p-8">
        {!showForm ? (
          <div className="text-center">
            <LockClosedIcon className="w-14 h-14 text-[#006D5B] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#005c4d] mb-2">
              Unlock the Full Article
            </h3>
            <p className="text-[#4B4B4B] mb-4">
              Join 15,000+ learners mastering orthodontics with expert guides,
              case studies, and weekly discussions.
            </p>
            <div className="bg-[#DCE6D5]/60 p-4 rounded-xl mb-5 text-left">
              <h4 className="font-semibold text-[#005c4d] mb-2">Free includes</h4>
              <ul className="text-sm text-[#4B4B4B] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Access to 200+ in-depth articles
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Downloadable study guides
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-[#006D5B]" /> Weekly case discussions
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full sm:w-auto min-w-[220px] bg-[#006D5B] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#005c4d] transition-colors shadow-lg"
              >
                Sign up / Log in
              </button>
              <span className="text-xs text-gray-500">No card required</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="text-sm text-[#006D5B] hover:text-[#005c4d]"
                onClick={() => setShowForm(false)}
              >
                ← Back
              </button>
              <div className="inline-flex bg-white/70 rounded-full p-1 border border-[#006D5B]/10">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mode === 'login' ? 'bg-[#006D5B] text-white' : 'text-[#005c4d]'
                  }`}
                  onClick={() => setMode('login')}
                >
                  Log in
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mode === 'signup' ? 'bg-[#006D5B] text-white' : 'text-[#005c4d]'
                  }`}
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Full name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="Dr. Jane Doe" required />
                    </div>
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Phone No.</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Designation</label>
                      <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="Orthodontist" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="••••••••" required />
                    </div>
                    <div>
                      <label className="block text-sm text-[#4B4B4B] mb-1">Confirm Password</label>
                      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="••••••••" required />
                    </div>
                  </div>
                </>
              )}
              {mode === 'login' && (
                <>
                  <div>
                    <label className="block text-sm text-[#4B4B4B] mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#4B4B4B] mb-1">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-[#006D5B] focus:border-transparent" placeholder="••••••••" required />
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#006D5B] text-white py-3 rounded-xl font-semibold hover:bg-[#005c4d] transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (mode === 'login' ? 'Log in' : (verificationSent ? 'Resend verification email' : 'Create account'))}
              </button>
              {mode === 'signup' && verificationSent && (
                <div className="mt-3 flex flex-col gap-2">
                  <div className="text-xs text-center text-gray-500">After verifying your email, click below to continue</div>
                  <button
                    type="button"
                    onClick={handleCompleteSignup}
                    disabled={verifying}
                    className="w-full bg-white text-[#006D5B] py-3 rounded-xl font-semibold border border-[#006D5B]/30 hover:bg-[#f7f9f7] transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
                  >
                    {verifying ? 'Checking verification...' : "I've verified my email, continue"}
                  </button>
                </div>
              )}
              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white text-[#4B4B4B] py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
              <p className="text-xs text-center text-gray-500">By continuing you agree to our Terms and Privacy Policy</p>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionGate;
