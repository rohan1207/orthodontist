import React, { createContext, useState, useEffect, useContext } from 'react';
import { buildApiUrl } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await fetch(buildApiUrl('/api/users/me'), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.data.user);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const signup = async (name, email, phone, designation, password) => {
    // This will be implemented in the SubscriptionGate component
    // For now, it's a placeholder
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
