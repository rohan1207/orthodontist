import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "shravani@123" && password === "shravani@123") {
      setError("");
      onAuthSuccess();
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && phone && email && password) {
      setError("");
      onAuthSuccess();
    } else {
      setError("Please fill in all fields.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`w-1/2 py-3 text-center font-semibold transition-all ${
                    isLogin
                      ? "text-[#006D5B] border-b-2 border-[#006D5B]"
                      : "text-gray-500"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`w-1/2 py-3 text-center font-semibold transition-all ${
                    !isLogin
                      ? "text-[#006D5B] border-b-2 border-[#006D5B]"
                      : "text-gray-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Welcome Back!
                    </h2>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                        placeholder="shravani@123"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                        placeholder="shravani@123"
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-[#006D5B] text-white py-3 rounded-lg font-semibold hover:bg-[#005c4d] transition-colors"
                    >
                      Login
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Create Your Account
                    </h2>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D5B] focus:border-transparent"
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                      type="submit"
                      className="w-full bg-[#006D5B] text-white py-3 rounded-lg font-semibold hover:bg-[#005c4d] transition-colors"
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
