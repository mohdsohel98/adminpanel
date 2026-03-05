import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, getToken } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(authService.isAuthenticated() ? getToken() : null);
  // role support temporarily disabled until backend includes it
  // const [role, setRole] = useState(getRole());

  useEffect(() => {
    // synchronize from localStorage on mount
    if (authService.isAuthenticated()) {
      setToken(getToken());
      // setRole(getRole());
    }
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    // role not available yet, will be added later
    // setRole(data.role || getRole());
    return data;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    // setRole(null);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, /*role,*/ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
